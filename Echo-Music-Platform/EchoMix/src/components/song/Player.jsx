import React from 'react';
import { FaBackward, FaForward } from 'react-icons/fa';

const Player = () => {
  return (
    <div style={{ 
      margin: "2rem auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      width: "min(95vw, 1000px)",
      flexWrap: "wrap",
      padding: "0 1rem"
    }}>
      <a href="/song2" style={{ 
        width: "30px", 
        color: "antiquewhite",
        flexShrink: 0
      }}>
        <FaBackward size="clamp(18px, 4vw, 24px)" />
      </a>
      
      <audio controls style={{ 
        width: "min(80vw, 500px)",
        maxWidth: "100%"
      }}>
        <source 
          src="../songlist/song.mp3" 
          type="audio/mp3" 
        />
      </audio>
      
      <a href="/song4" style={{ 
        width: "30px", 
        color: "antiquewhite",
        flexShrink: 0
      }}>
        <FaForward size="clamp(18px, 4vw, 24px)" />
      </a>
    </div>
  );
};

export default Player;