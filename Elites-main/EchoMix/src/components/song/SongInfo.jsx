import React from 'react';
import songImage from './songphoto/meremehbob.jpeg';

const SongInfo = () => {
  return (
    <div style={{ 
      width: "min(90vw, 400px)",
      height: "auto",
      textAlign: "center",
      margin: "2rem auto 0",
      color: "antiquewhite",
      padding: "0 1rem"
    }}>
      <img 
        src={songImage} 
        alt="song" 
        style={{ 
          width: "100%",
          height: "auto",
          maxHeight: "400px",
          maxWidth: "400px",
          borderRadius: "30px",
          aspectRatio: "1/1",
          objectFit: "cover"
        }}
      />
      <h3 style={{ fontSize: "clamp(1.2rem, 4vw, 1.5rem)", marginTop: "1rem" }}>
        Mere Mehboob Mere Sanam
      </h3>
    </div>
  );
};

export default SongInfo;