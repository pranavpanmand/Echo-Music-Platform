package com.echo.app.entity;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "reviews")
@Data
@NoArgsConstructor
public class Review {

    @Id
    private ObjectId id;

    @NonNull
    private String username;

    @NonNull
    private String message;

    private LocalDateTime createdAt = LocalDateTime.now();
}
