package com.echo.app.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.echo.app.entity.UserQuery;

public interface UserQueryRepository extends MongoRepository<UserQuery,ObjectId>{

}
