import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Home.css";
import ss from "./songSymbol.png";
import { useUser } from "../../UserContext/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";

function Home() {
  const { user, song, setSong } = useUser();
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);
  const [sampleHistoryList, setSampleHistoryList] = useState([]);

  function createArtistCard(src, artistName) {
    return (
      <div className="pArtistCardClass" onClick={()=>{
         navigate(`/artist/${artistName}`)
      }}>
        <img src={src} className="pArtistCardImgClass" />
        <p>{`${artistName}`}</p>
      </div>
    );
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  if (user === null || user === undefined) {
    return null;
  }

  function handleProfileClick() {
    navigate("/profile");
  }

  const popularArtists = [
    "Drake",
    "Billie Eilish",
    "Arijit Singh",
    "BTS",
    "Blackpink",
  ];

  function getUserHistory() {
    const fetchUserHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/song/getNewRecentlyPlayed/${user.userName}`
        );
        setHistoryList(response.data);
        console.log("User history fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };

    if (user?.userName) {
      fetchUserHistory();
    }
  }

  useEffect(() => {
    getUserHistory();
  }, []);

  useEffect(() => {
    if (historyList.length > 0) {
      setSampleHistoryList(
        historyList.map(
          (song) => song
          // image: `http://localhost:8080/artist/image/${song.artistName}`,
          // songName: song.songName,
          // artistName: song.artistName,
        )
      );
    }
  }, [historyList]);

  function getArtistImgSrc(artistName) {
    return `http://localhost:8080/artist/image/${artistName}`;
  }

  function populateArtistList(artistName) {
    let imageSrc = getArtistImgSrc(artistName);
    return createArtistCard(imageSrc, artistName);
  }

  function getUserImage() {
    const imageId = user.imgId;
    if (imageId !== null && imageId !== "") {
      return (
        <img
          src={`http://localhost:8080/user/image/${imageId}`}
          alt="Profile"
        />
      );
    } else {
      return (
        <img
          src="https://avatar.iran.liara.run/public/boy?username=Ash"
          alt="Default Profile"
        />
      );
    }
  }

  async function handleSongClick(song) {
    try {
      await axios.get(
        `http://localhost:8080/song/updateList/${user.userName}/${song.id}`
      );
    } catch (error) {
      console.error("Error updating song list:", error);
    }
    getUserHistory();
  }

  function displayHistory(src) {
    return (
      <div
        className="historySongCard"
        onClick={() => {
          handleSongClick(src);
          setSong(src);
        }}
      >
        <div className="hSongCardImg">
          <img
            src={`http://localhost:8080/artist/image/${src.artistName}`}
            alt=""
          />
        </div>
        <p className="artistTitle">{src.artistName}</p>
        <div className="songTitle">
          <p>{src.songName}</p>
        </div>
      </div>
    );
  }

  function toArtists() {
    navigate("/artists");
  }
  function toRecentlyPlayed() {
    navigate("/recentlyPlayed");
  }

  return (
    <>
      <div className="container">
        <NavBar className="navBar"></NavBar>
        <div className="mainContent">
          <div className="profileBar">
            <div className="settingsIconContainer">
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </div>
            <div className="profileIconContainer" onClick={handleProfileClick}>
              <React.Fragment>{getUserImage()}</React.Fragment>
              <p>{user.userName}</p>
            </div>
          </div>

          <div className="pArtistAndNowPlayingContainer">
            <div className="pArtistandRecentlyContainer">
              <div className="pArtist">
                <div className="titleCont">
                  <p className="pTitle">Popular artists</p>
                  <p className="seeAll" onClick={toArtists}>
                    See All
                  </p>
                </div>

                <div className="artistList">
                  {popularArtists.map((artistName, index) => {
                    return (
                      <React.Fragment key={index}>
                        {populateArtistList(artistName)}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div className="recentlyPlayed">
                <div className="titleCont">
                  <p className="pTitle">Recently played</p>
                  <p className="seeAll" onClick={toRecentlyPlayed}>See All</p>
                </div>

                <div className="historyList">
                  {sampleHistoryList.length > 0 ? (
                    sampleHistoryList.map((src, index) => {
                      return (
                        <React.Fragment key={index}>
                          {displayHistory(src)}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <p className="noSongMessage">No recently played songs</p>
                  )}
                </div>
              </div>
            </div>

            {song === null || song === undefined ? (
              <div className="playingContainer">
                <div className="nowImage">
                  <p>Please select a song to play....</p>
                </div>
                <div className="nowPlayingContainer">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                  <div className="playingTitleContainer">
                    <p className="playingSongName" hidden>
                      SongName
                    </p>
                    <p className="playingArtistName" hidden>
                      ArtistName
                    </p>
                  </div>
                  <audio
                    className="audioBar"
                    controls
                    preload="metadata"
                    loop
                    hidden
                  ></audio>
                </div>
              </div>
            ) : (
              <div className="playingContainer">
                <div className="nowImage">
                  <p>Now Playing...</p>
                </div>
                <div className="nowPlayingContainer">
                  <img src={getArtistImgSrc(song.artistName)} alt="" />
                  <div className="playingTitleContainer">
                    <p className="playingSongName">{song.songName}</p>
                    <p className="playingArtistName">{song.artistName}</p>
                  </div>
                  <audio
                    className="audioBar"
                    controls
                    preload="metadata"
                    loop
                    src={`http://localhost:8080/song/stream/${song.songFile}`}
                  ></audio>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
