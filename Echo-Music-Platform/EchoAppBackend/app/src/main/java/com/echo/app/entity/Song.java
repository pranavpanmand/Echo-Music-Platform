package com.echo.app.entity;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "songs")
@Data
@NoArgsConstructor
public class Song {

    @Id
    private ObjectId id;

    @NonNull
    private String songName;

    @NonNull
    private String artistName;

    @NonNull
    private Long likes = 0l;

    @NonNull 
    private Long disLikes = 0l;

    @NonNull
    private ObjectId songFile;

    @NonNull
    private String category;
    
    private LocalDateTime date;

}   
