package com.echo.app.entity;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SongResponse {
    private String id;
    private String songName;
    private String artistName;
    private Long likes;
    private Long disLikes;
    private String songFile;  // hex string of ObjectId
    private String language;
    private LocalDateTime date;

    public SongResponse(Song song) {
        this.id = song.getId().toHexString();
        this.songName = song.getSongName();
        this.artistName = song.getArtistName();
        this.likes = song.getLikes();
        this.disLikes = song.getDisLikes();
        this.songFile = song.getSongFile().toHexString();  // convert ObjectId to string
        this.language = song.getCategory();
        this.date = song.getDate();
    }
}
