package com.echo.app.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.echo.app.entity.User;

public interface UserRepository extends MongoRepository<User,ObjectId>{

    Optional<User> findByUserName(String userName);
    List<User> findByIsArtistTrueAndUserNameContainingIgnoreCase(String keyword);
    Optional<User> findByEmail(String email);

}
