package com.echo.app.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.echo.app.entity.Playlist;

public interface PlaylistRepository extends MongoRepository<Playlist,ObjectId>{

}
