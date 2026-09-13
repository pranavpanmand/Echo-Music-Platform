package com.echo.app.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.echo.app.entity.Song;
import com.echo.app.entity.SongResponse;
import com.echo.app.entity.User;
import com.echo.app.service.SongService;
import com.echo.app.service.UserService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/song")
public class SongController {

    @Autowired
    private SongService songService;

    @Autowired
    private UserService userService;

    @Autowired
    private GridFSBucket gridFSBucket;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadSong(
            @RequestParam String songName,
            @RequestParam String artistName,
            @RequestParam String category,
            @RequestParam MultipartFile file) {

        try (var inputStream = file.getInputStream()) {
            ObjectId fileId = gridFSBucket.uploadFromStream(
                    file.getOriginalFilename(),
                    inputStream,
                    new GridFSUploadOptions().chunkSizeBytes(21048576));

            Song song = new Song();
            song.setSongName(songName);
            song.setArtistName(artistName);
            song.setSongFile(fileId);
            song.setLikes(0L);
            song.setDisLikes(0L);
            song.setDate(LocalDateTime.now());
            song.setCategory(category);
            songService.saveSong(song);
            System.out.println("Saved song ID: " + song.getId());
            Optional<User> optUser = userService.findByUserName(artistName);
            User user = optUser.get();
            List<String> oldSongs;
            if (optUser.isPresent()) {
                oldSongs = user.getUserSongs();
                if (oldSongs == null) {
                    oldSongs = new ArrayList<>();
                }
                oldSongs.add(0, song.getId().toHexString());
                user.setUserSongs(oldSongs);
                userService.saveUser(user);
            } else {
                return ResponseEntity.badRequest().body("User not found.");
            }

            return ResponseEntity.ok().body(user);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload song.");
        }
    }

    @GetMapping("getSong/{id}")
    public ResponseEntity<?> getSongById(@PathVariable ObjectId id) {
        Optional<Song> song = songService.getSong(id);
        if (song.isPresent()) {
            return ResponseEntity.ok().body(song.get());
        }
        return ResponseEntity.badRequest().body("Song not found.");
    }

    @GetMapping("/updateList/{userName}/{songId}")
    public ResponseEntity<?> updateSongList(@PathVariable String userName, @PathVariable String songId) {
     
        Optional<User> userOpt = userService.findByUserName(userName);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<String> recentlyPlayed = user.getRecentlyPlayed();
            if (recentlyPlayed == null) {
                recentlyPlayed = new ArrayList<>();
            }

            recentlyPlayed.remove(songId);

            recentlyPlayed.add(0, songId);
            if (recentlyPlayed.size() > 20) {
                recentlyPlayed = recentlyPlayed.subList(0, 20);
            }
            user.setRecentlyPlayed(recentlyPlayed);
            userService.saveUser(user);
            System.out.println("Updated recently played songs: " + recentlyPlayed);

            return ResponseEntity.ok().body("Song list updated successfully.");
        } else {
            System.out.println("User not found: " + userName);
            return ResponseEntity.badRequest().body("User not found.");

        }
    }

    @GetMapping("/stream/{fileId}")
    public ResponseEntity<?> streamSong(@PathVariable String fileId,
            HttpServletResponse response) {
        ObjectId objectId;
        try {
            objectId = new ObjectId(fileId);
        } catch (IllegalArgumentException e) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body("Invalid file ID.");
        }

        GridFSFile gridFSFile = gridFSBucket.find(new Document("_id", objectId)).first();
        if (gridFSFile == null) {
            response.setStatus(HttpStatus.NOT_FOUND.value());
            return ResponseEntity.notFound().build();
        }

        response.setContentType("audio/mpeg");
        response.setHeader("Content-Disposition", "inline; filename=\"" + gridFSFile.getFilename() + "\"");

        try (GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(objectId)) {
            String filename = gridFSFile.getFilename();
            String contentType = filename.endsWith(".mp3") ? "audio/mpeg"
                    : filename.endsWith(".wav") ? "audio/wav"
                            : filename.endsWith(".ogg") ? "audio/ogg" : "application/octet-stream";
            response.setContentType(contentType);
            response.setHeader("Content-Disposition", "inline; filename=\"" + gridFSFile.getFilename() + "\"");
            byte[] buffer = new byte[16384];
            int bytesRead;
            try {
                while ((bytesRead = downloadStream.read(buffer)) != -1) {
                    response.getOutputStream().write(buffer, 0, bytesRead);
                }
                response.flushBuffer();
            } catch (IOException e) {
                response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            }
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getNewRecentlyPlayed/{userName}")
    public ResponseEntity<?> getNewRecentlyPlayed(@PathVariable String userName) {
        Optional<User> userOpt = userService.findByUserName(userName);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<String> recentlyPlayed = user.getRecentlyPlayed();
            List<Song> matchedSongs= new ArrayList<>();
            for(String songId : recentlyPlayed) {
                Optional<Song> matchedSong = songService.getSong(new ObjectId(songId));
                matchedSong.ifPresent(matchedSongs::add);
            }
            List<SongResponse> responseList = matchedSongs.stream()
                .map(SongResponse::new)
                .collect(Collectors.toList());



            return ResponseEntity.ok().body(responseList);
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }

    @GetMapping("/getArtistSongs/{artistName}")
    public ResponseEntity<?> getArtistSongs(@PathVariable String artistName) {
         Optional<User> userOpt = userService.findByUserName(artistName);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<String> artistSongs = user.getUserSongs();
            List<Song> matchedSongs= new ArrayList<>();
            for(String songId : artistSongs) {
                Optional<Song> matchedSong = songService.getSong(new ObjectId(songId));
                matchedSong.ifPresent(matchedSongs::add);
            }
            List<SongResponse> responseList = matchedSongs.stream()
                .map(SongResponse::new)
                .collect(Collectors.toList());

            return ResponseEntity.ok().body(responseList);
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }
    

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteSong(@PathVariable ObjectId id) {
        Optional<Song> songOpt = songService.getSong(id);
        if (songOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Song not found.");
        }

        Song song = songOpt.get();
        try {
            gridFSBucket.delete(song.getSongFile());
            songService.deleteById(id);
            return ResponseEntity.ok("Song deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete song: " + e.getMessage());
        }
    }

    @GetMapping("/playlist")
    public List<SongResponse> getPlaylistByCategory(@RequestParam String category) {
        List<Song> songs = songService.getSongsByCategory(category);
        return songs.stream().map(SongResponse::new).collect(Collectors.toList());
    }
    @PostMapping("/like/{songId}")
    public ResponseEntity<?> likeSong(@PathVariable String songId, @RequestParam String userName) {
        if (!ObjectId.isValid(songId)) {
            return ResponseEntity.badRequest().body("Invalid song ID format.");
        }
        Optional<User> userOpt = userService.findByUserName(userName);
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body("User not found");
        User user = userOpt.get();
        if (!user.getLikedSongs().contains(songId)) {
            user.getLikedSongs().add(songId);
            user.getDislikedSongs().remove(songId); 
            userService.saveUser(user);
        }

        return ResponseEntity.ok("Song liked successfully.");
    }

    @PostMapping("/dislike/{songId}")
    public ResponseEntity<?> dislikeSong(@PathVariable String songId, @RequestParam String userName) {
        if (!ObjectId.isValid(songId)) {
            return ResponseEntity.badRequest().body("Invalid song ID format.");
        }
        Optional<User> userOpt = userService.findByUserName(userName);
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body("User not found");

        User user = userOpt.get();
        if (!user.getDislikedSongs().contains(songId)) {
            user.getDislikedSongs().add(songId);
            user.getLikedSongs().remove(songId); 
            userService.saveUser(user);
        }

        return ResponseEntity.ok("Song disliked successfully.");
    }
@GetMapping("/liked")
public ResponseEntity<?> getLikedSongs(@RequestParam String userName) {
    Optional<User> userOpt = userService.findByUserName(userName);
    if (userOpt.isEmpty()) return ResponseEntity.badRequest().body("User not found");

    User user = userOpt.get();
    List<Song> likedSongs = user.getLikedSongs().stream()
        .map(id -> songService.getSong(new ObjectId(id)))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .toList();

    return ResponseEntity.ok(likedSongs);
}

@GetMapping("/disliked")
public ResponseEntity<?> getDislikedSongs(@RequestParam String userName) {
    Optional<User> userOpt = userService.findByUserName(userName);
    if (userOpt.isEmpty()) return ResponseEntity.badRequest().body("User not found");

    User user = userOpt.get();
    List<Song> dislikedSongs = user.getDislikedSongs().stream()
        .map(id -> songService.getSong(new ObjectId(id)))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .toList();

    return ResponseEntity.ok(dislikedSongs);
}


    @GetMapping("/search")
    public ResponseEntity<?> searchSongsByName(@RequestParam String keyword) {
        List<Song> matchedSongs = songService.searchSongsByName(keyword);
        List<SongResponse> responseList = matchedSongs.stream()
                .map(SongResponse::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(responseList);
    }

}
