import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../UserContext/UserContext";
import "./LikedSongs.css"; 

const LikedSongs = () => {
  const { user } = useUser();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      if (!user || !user.userName) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/song/liked?userName=${user.userName}`
        );
        setSongs(res.data);
      } catch (err) {
        console.error("Failed to fetch liked songs", err);
        alert("Could not load liked songs. Please try again.");
      }
      setLoading(false);
    };

    fetchLikedSongs();
  }, [user]);

  return (
    <div className="liked-songs-page">
      <h2 className="liked-heading">💖 Your Liked Songs</h2>

      {loading ? (
        <p>Loading your liked songs...</p>
      ) : songs.length === 0 ? (
        <p>You haven't liked any songs yet.</p>
      ) : (
        <div className="songs-grid">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <h3>{song.songName}</h3>
              <p>{song.artistName}</p>
              <audio
                controls
                src={`http://localhost:8080/song/stream/${song.songFile}`}
                preload="metadata"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongs;
