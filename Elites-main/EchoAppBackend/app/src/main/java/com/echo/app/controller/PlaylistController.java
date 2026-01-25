package com.echo.app.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.echo.app.entity.Playlist;
import com.echo.app.entity.User;
import com.echo.app.service.PlaylistService;
import com.echo.app.service.UserService;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createPlaylist(
            @RequestParam String userName,
            @RequestParam String playlistName) {
        Optional<User> userOpt = userService.findByUserName(userName);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        Playlist playlist = new Playlist();
        playlist.setName(playlistName);
        playlist.setDate(LocalDateTime.now());
        playlistService.savePlaylist(playlist);

        User user = userOpt.get();
        if (!user.getPlayLists().contains(playlist.getId().toHexString())) {
            user.getPlayLists().add(playlist.getId().toHexString());
            userService.saveUser(user);
        }

        return ResponseEntity.ok(playlist);
    }

    @GetMapping("/{playlistId}")
    public ResponseEntity<?> getPlaylist(@PathVariable ObjectId playlistId) {
        Optional<Playlist> optplaylist = playlistService.getPlaylist(playlistId);
        if(optplaylist.isPresent()){
            return ResponseEntity.ok().body(optplaylist.get());
        }

        return ResponseEntity.badRequest().body("Playlist not found.");

    }


    @DeleteMapping("/{userName}/{playlistId}")
    public ResponseEntity<?> deletePlaylist(
            @PathVariable String userName,
            @PathVariable ObjectId playlistId) {
        Optional<User> userOpt = userService.findByUserName(userName);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        playlistService.deletePlaylist(playlistId);
        User user = userOpt.get();
        user.getPlayLists().remove(playlistId.toHexString());
        userService.saveUser(user);

        return ResponseEntity.ok("Playlist deleted.");
    }


    @PostMapping("/{playlistId}/songs/add")
    public ResponseEntity<?> addSongToPlaylist(
            @PathVariable ObjectId playlistId,
            @RequestParam ObjectId songId) {
        Optional<Playlist> plOpt = playlistService.getPlaylist(playlistId);
        if (plOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Playlist not found.");
        }
        Playlist pl = plOpt.get();
        if (!pl.getSongs().contains(songId)) {
            pl.getSongs().add(songId);
            playlistService.savePlaylist(pl);
        }
        return ResponseEntity.ok(pl);
    }

    @PostMapping("/{playlistId}/songs/remove")
    public ResponseEntity<?> removeSongFromPlaylist(
            @PathVariable ObjectId playlistId,
            @RequestParam ObjectId songId) {
        Optional<Playlist> plOpt = playlistService.getPlaylist(playlistId);
        if (plOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Playlist not found.");
        }
        Playlist pl = plOpt.get();
        if (pl.getSongs().remove(songId)) {
            playlistService.savePlaylist(pl);
        }
        return ResponseEntity.ok(pl);
    }
}
