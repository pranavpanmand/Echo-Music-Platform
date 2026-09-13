import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlaylistPage.css';

const PlaylistPage = () => {
  const [language, setLanguage] = useState('bollywood');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/song/playlist?language=${language}`);
        setSongs(res.data);
      } catch (err) {
        console.error('Error fetching songs:', err);
      }
      setLoading(false);
    };
    fetchSongs();
  }, [language]);

  return (
    <div className="playlist-page">
      <header className="header">
        <h1 className="header-title">🎧 Explore Playlists</h1>
        <p className="header-subtitle">Choose a language and vibe with your favorite tracks</p>
      </header>
      <main className="content">
        <div className="playlist-header">
          <h2 className="playlist-title">Your Playlist</h2>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
            <option value="bollywood">Bollywood</option>
            <option value="telugu">Telugu</option>
            <option value="english">English</option>
            <option value="punjabi">Punjabi</option>
            <option value="hindi">Hindi</option>
            <option value="k-pop">K-Pop</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
            <option value="classical">Classical</option>
          </select>
        </div>
        {loading ? (
          <div className="loading">Loading songs...</div>
        ) : songs.length === 0 ? (
          <div className="no-songs">No songs available for this language.</div>
        ) : (
          <div className="songs-grid">
            {songs.map((song) => (
                <div key={song.id} className="song-card">
                  <h3 className="song-title">{song.songName}</h3>
                  <p className="song-artist">{song.artistName}</p>
                  <audio
                    controls
                    src={`http://localhost:8080/song/stream/${song.songFile}`}
                    className="audio-player"
            />
          </div>
        ))}

          </div>
        )}
      </main>
    </div>
  );
};

export default PlaylistPage;