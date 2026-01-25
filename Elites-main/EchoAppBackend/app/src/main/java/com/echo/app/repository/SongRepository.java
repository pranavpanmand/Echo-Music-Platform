package com.echo.app.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

import com.echo.app.entity.Song;

public interface SongRepository extends MongoRepository<Song, ObjectId> {
    List<Song> findByCategoryIgnoreCase(String category);

    List<Song> findBySongNameContainingIgnoreCase(String keyword);
}
