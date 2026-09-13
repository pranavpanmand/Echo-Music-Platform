package com.echo.app.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.echo.app.entity.Review;

public interface ReviewRepository extends MongoRepository<Review, ObjectId> {
}

