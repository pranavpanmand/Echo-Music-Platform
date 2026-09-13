package com.echo.app.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String userName;

    @Indexed(unique = true)
    private String email;
    private String password;

    private long followers = 0L;

    private List<String> recentlyPlayed = new ArrayList<>();

    private List<String> playLists = new ArrayList<>();

    private List<String> followedArtists = new ArrayList<>();
    private List<String> userSongs = new ArrayList<>();
    private ObjectId userImg;
    private String imgId;
    private LocalDateTime date = LocalDateTime.now();
    private boolean isArtist = false;
    private List<String> likedSongs = new ArrayList<>();
private List<String> dislikedSongs = new ArrayList<>();

}
