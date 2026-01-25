package com.echo.app.service;

import java.util.Optional;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.echo.app.entity.Song;
import com.echo.app.repository.SongRepository;

@Service
public class SongService {

    @Autowired
    private SongRepository songrepository;

    public void saveSong(Song song) {
        songrepository.save(song);
    }

    public Optional<Song> getSong(ObjectId id) {
        return songrepository.findById(id);
    }

    public void deleteById(ObjectId id) {
        songrepository.deleteById(id);
    }

    public List<Song> getSongsByCategory(String category) {
        return songrepository.findByCategoryIgnoreCase(category);
    }

    public List<Song> searchSongsByName(String keyword) {
        return songrepository.findBySongNameContainingIgnoreCase(keyword);
    }
}
