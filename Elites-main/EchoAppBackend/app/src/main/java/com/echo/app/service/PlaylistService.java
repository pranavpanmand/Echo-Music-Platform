package com.echo.app.service;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.echo.app.entity.Playlist;
import com.echo.app.repository.PlaylistRepository;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    public void savePlaylist(Playlist playlist){
        playlistRepository.save(playlist);
    }

    public Optional<Playlist> getPlaylist(ObjectId id){
        return playlistRepository.findById(id);
    }

    public void deletePlaylist(ObjectId id){
        playlistRepository.deleteById(id);
    }

}
