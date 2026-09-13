package com.echo.app.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "playlists")
@Data
@NoArgsConstructor
public class Playlist {
    
    @Id
    private ObjectId id;

    @NonNull
    private String name;
    private LocalDateTime date;
    private List<ObjectId> songs = new ArrayList<>();
}
