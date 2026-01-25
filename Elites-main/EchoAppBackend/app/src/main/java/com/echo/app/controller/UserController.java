package com.echo.app.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;

import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.echo.app.entity.LoginRequest;
import com.echo.app.entity.User;
import com.echo.app.service.UserService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private GridFSBucket gridFSBucket;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestPart(value = "profilePic", required = false) MultipartFile profileImage) throws IOException {

        if (userService.findByUserName(name).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }
        if (userService.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        ObjectId imageId = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            try (var is = profileImage.getInputStream()) {
                imageId = gridFSBucket.uploadFromStream(
                        profileImage.getOriginalFilename(),
                        is,
                        new GridFSUploadOptions().chunkSizeBytes(358400));
            }
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User user = new User();
        user.setUserName(name);
        user.setEmail(email);
        user.setPassword(encoder.encode(password));
        user.setUserImg(imageId);
        user.setImgId(imageId != null ? imageId.toHexString() : null);
        user.setFollowers(0L);
        user.setDate(LocalDateTime.now());

        try {
            userService.saveUser(user);
            user.setPassword(null);

            return ResponseEntity.ok(user);
        } catch (DuplicateKeyException e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        Optional<User> opt = userService.findByEmail(request.getEmail());
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }
        User found = opt.get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(request.getPassword(), found.getPassword())) {
            return ResponseEntity.badRequest().body("Email or password did not match.");
        }
        found.setPassword(null);
        return ResponseEntity.ok(found);
    }

    @GetMapping("/image/{id}")
    public void getImageById(@PathVariable String id, HttpServletResponse response)
            throws IllegalStateException, IOException {
        ObjectId fileId = new ObjectId(id);
        GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(fileId);
        GridFsResource resource = new GridFsResource(downloadStream.getGridFSFile(), downloadStream);
        response.setContentType("image/jpeg");
        StreamUtils.copy(resource.getInputStream(), response.getOutputStream());
    }

    @GetMapping("/artist/{artistName}")
    public ResponseEntity<?> getArtist(@PathVariable String artistName) {
        Optional<User> opt = userService.findByUserName(artistName);
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().body("Artist not found.");
        }
        User artist = opt.get();
        artist.setEmail(null);
        artist.setPassword(null);
        artist.setPlayLists(null);
        artist.setRecentlyPlayed(null);
        artist.setFollowedArtists(null);
        return ResponseEntity.ok(artist);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String userName) {
        Optional<User> opt = userService.findByUserName(userName);
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }
        User user = opt.get();
        userService.deleteById(user.getId()); // remove by ObjectId
        return ResponseEntity.ok("User deleted successfully.");
    }

    @GetMapping("/artist/{userName}/songs")
    public ResponseEntity<?> getArtistSongs(@PathVariable String userName) {
        Optional<User> opt = userService.findByUserName(userName);
        if (opt.isEmpty() || !opt.get().isArtist()) {
            return ResponseEntity.badRequest().body("Artist not found.");
        }
        return ResponseEntity.ok(opt.get().getUserSongs());
    }

    @PostMapping("/update/by-email")
    public ResponseEntity<?> updateUserByEmail(
            @RequestParam("email") String email,
            @RequestParam("userName") String userName) {

        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = optionalUser.get();
        user.setUserName(userName);


        try {
            userService.saveUser(user);
            user.setPassword(null); 
            return ResponseEntity.ok(user);
        } catch (DuplicateKeyException e) {
            return ResponseEntity.badRequest().body("Username or email already exists");
        }
    }

}
