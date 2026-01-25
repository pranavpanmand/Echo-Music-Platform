import React from "react";
import "./NavBar.css";
import { useNavigate, useLocation } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  function toUpload() {
    navigate("/upload");
  }

  function toCategory() {
    navigate("/category");
  }

  function toFeatures() {
    navigate('/features');
  }

  function toAboutUs() {
    navigate("/aboutus");
  }

  function toContactUs() {
    navigate("/contactUsPage");
  }

  function toBrowse() {
    navigate("/browse");
  }

  function toRateUs() {
    navigate("/rateus");
  }

  function toLikedSongs() {
    navigate("/liked");
  }

  function toArtists() {
    navigate("/artists");
  }

  function toHome() {
    navigate("/home");
  }

  function toRecentlyPlayed() {
    navigate("/recentlyPlayed");
  }

  function toMySongs() {
    navigate("/mySongs");
  }

  return (
    <div className="navBar">
      <div className="libButtons">
        <div className="contTitle">Library</div>
        <li
          onClick={toHome}
          className={pathname === "/home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={toBrowse}
          className={pathname === "/browse" ? "active" : ""}
        >
          Browse
        </li>
        <li
          onClick={toArtists}
          className={pathname === "/artists" ? "active" : ""}
        >
          Artists
        </li>
        <li
          onClick={toCategory}
          className={pathname === "/category" ? "active" : ""}
        >
          Category
        </li>
      </div>

      <div className="myMusicContainer">
        <div className="contTitle">My Music</div>
        <li
          onClick={toRecentlyPlayed}
          className={pathname === "/recentlyPlayed" ? "active" : ""}
        >
          Recently Played
        </li>
        <li
          onClick={toMySongs}
          className={pathname === "/mySongs" ? "active" : ""}
        >
          My Songs
        </li>
        <li
          onClick={toLikedSongs}
          className={pathname === "/liked" ? "active" : ""}
        >
          Liked Songs
        </li>
        <li
          onClick={toUpload}
          className={pathname === "/upload" ? "active" : ""}
        >
          Upload Song
        </li>
      </div>
      
      <div className="moreOptionContainer">

        <div className="contTitle">More options</div>
        <li
          onClick={toContactUs}
          className={pathname === "/contactUsPage" ? "active" : ""}
        >
          Contact us
        </li>
        <li
          onClick={toAboutUs}
          className={pathname === "/aboutus" ? "active" : ""}
        >
          About Us
        </li>
        <li
          onClick={toFeatures}
          className={pathname === "/features" ? "active" : ""}
        >
          Features
        </li>
        <li
          onClick={toRateUs}
          className={pathname === "/rateus" ? "active" : ""}
        >
          Rate us
        </li>

      </div>
    </div>
  );
}

export default NavBar;
