package com.echo.app.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.echo.app.entity.User;
import com.echo.app.entity.UserResponse;
import com.echo.app.service.UserService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSDownloadStream;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/artist")
public class ArtistController {

    @Autowired
    private UserService userService;
    @Autowired
    private GridFSBucket gridFSBucket;

    @GetMapping("/image/{artistName}")
    public void getArtistImage(@PathVariable String artistName, HttpServletResponse response) throws IOException {
        Optional<User> optionalUser = userService.findByUserName(artistName);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getImgId() != null) {
                try {
                    ObjectId fileId = new ObjectId(user.getImgId());
                    GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(fileId);
                    GridFsResource resource = new GridFsResource(downloadStream.getGridFSFile(), downloadStream);
                    response.setContentType("image/jpeg");
                    StreamUtils.copy(resource.getInputStream(), response.getOutputStream());
                    response.flushBuffer();
                    return;
                } catch (IllegalArgumentException e) {
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid image ID");
                    return;
                } catch (Exception e) {
                    response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error fetching image");
                    return;
                }
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Image not available for this user");
                return;
            }
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Artist not found");
        }
    }

    @GetMapping("/search/artists")
    public List<UserResponse> searchArtists(@RequestParam("keyword") String keyword) {
        return userService.findByIsArtistTrueAndUserNameContainingIgnoreCase(keyword)
                .stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/search/{artistName}")
    public ResponseEntity<UserResponse> getArtistByName(@PathVariable String artistName) {
        Optional<User> optionalUser = userService.findByUserName(artistName);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isArtist()) {
                return ResponseEntity.ok(new UserResponse(user));
            } else {
                return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN).build();
            }
        } else {
            return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND).build();
        }
    }

}
