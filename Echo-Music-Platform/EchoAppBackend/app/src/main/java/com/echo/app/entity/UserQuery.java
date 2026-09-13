package com.echo.app.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "userQueries")
@Data
@NoArgsConstructor
public class UserQuery {
    
    @Id
    private ObjectId id;

    @NonNull
    private String userName;

    @NonNull
    private String email;
    @NonNull
    private String message;
    
}
