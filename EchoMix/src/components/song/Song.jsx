import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './song.css';
import CustomNavbar from './Navbar';
import SongInfo from './SongInfo';
import Player from './Player';

function Song() {
  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <CustomNavbar />
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 150px)',
        paddingBottom: '4rem'
      }}>
        <SongInfo />
        <Player />
      </main>
    </div>
  );
}

export default Song;