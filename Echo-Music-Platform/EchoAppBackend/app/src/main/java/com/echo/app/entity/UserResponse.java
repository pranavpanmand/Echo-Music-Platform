package com.echo.app.entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class UserResponse {
    private String id;
    private String userName;
    private String email;
    private long followers;
    private boolean isArtist;
    private String imgId;
    private LocalDateTime date;
    private List<String> userSongs;

    public UserResponse(User user) {
        ObjectId userId = user.getId();
        this.id = userId != null ? userId.toHexString() : null;
        this.userName = user.getUserName();
        this.email = user.getEmail();
        this.followers = user.getFollowers();
        this.isArtist = user.isArtist();
        this.imgId = user.getImgId();
        this.date = user.getDate();
        this.userSongs = user.getUserSongs();
    }
}
