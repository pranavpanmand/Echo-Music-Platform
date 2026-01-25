import React from 'react';
import Aboutus from './components/Aboutus/Aboutus'; 
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Upload from './components/Upload/Upload';
import Song from './components/song/Song';
import { UserProvider } from './UserContext/UserContext';
import Playlist from './components/playlist/PlaylistPage';
import Category from './components/Category/Category';
import Features from './components/Features/Features';
import ContactUsPage from './components/ContactUs/ContactUsPage';
import Browse from './components/Browse/Browse';
import RateUs from './components/Rateus/Rateus';
import LikedSongs from './components/LikedSongs/LikedSongs';
import Artists from './components/Artists/Artists';
import RecentlyePlayed from './components/RecentlyPlayed/RecentlyPlayed';
import Artist from './components/Artist/Artist';
import MySongs from './components/MySongs/MySongs';


function App() {
  return (
    <>

      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LoginSignup />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/playlist' element={<Playlist />} />
            <Route path='/category' element={<Category />} />
            <Route path='/aboutus' element={<Aboutus />} /> 
            <Route path='/features' element={<Features />} />
            <Route path='/contactUsPage' element={<ContactUsPage />} />
            <Route path='/browse' element={<Browse />} />
            <Route path='/rateus' element={<RateUs />} />
            <Route path='/liked' element={<LikedSongs />} />
            <Route path='/artists' element={<Artists/>} />
            <Route path='/recentlyPlayed' element={<RecentlyePlayed />} />
            <Route path='/artist/:artistName' element={<Artist />} />
            <Route path='/mySongs' element={<MySongs></MySongs>}/>
          </Routes>
        </Router>
      </UserProvider>

    </>
  );
}

export default App;
