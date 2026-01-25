import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Artists.css";
import { useUser } from "../../UserContext/UserContext";
import { useNavigate } from "react-router";

function Artists() {
  const { user, song, setSong } = useUser();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [artistList, setArtistList] = useState([]);
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchAllArtistsByAlphabet();
    }
  }, []);

  function fetchAllArtistsByAlphabet() {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const allResults = [];

    Promise.all(
      letters.map((letter) =>
        fetch(`http://localhost:8080/artist/search/artists?keyword=${letter}`)
          .then((res) => res.json())
          .then((data) => {
            allResults.push(...data);
          })
          .catch((err) => console.error(`Failed for letter ${letter}:`, err))
      )
    ).then(() => {
      const uniqueArtists = Array.from(
        new Map(allResults.map((artist) => [artist.userName, artist])).values()
      );
      setArtistList(uniqueArtists);
    });
  }

  function getArtistImgSrc(artistName) {
    return `http://localhost:8080/artist/image/${artistName}`;
  }

  function handleSearchChange(e) {
  const value = e.target.value;
  setSearchQuery(value);

  if (value.trim() === "") {
    fetchAllArtistsByAlphabet();
    return;
  }

  fetch(`http://localhost:8080/artist/search/artists?keyword=${value}`)
    .then((res) => res.json())
    .then((data) => setArtistList(data))
    .catch((err) => console.error("Search failed:", err));
}

  function createArtistCard(artist, index) {
    return (
      <div
        key={index}
        className="Artists-songCard"
        onClick={() => {
          navigate(`/artist/${artist.userName}`);
        }}
      >
        <img
          src={getArtistImgSrc(artist.userName)}
          alt={artist.userName}
          className="Artists-songImage"
        />
        <div className="Artists-songDetails">
          <p className="Artists-songName">{artist.userName}</p>
          <p className="Artists-artistName">{artist.followers} followers</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <div className="Artists-container">
        <NavBar className="Artists-navBar" />
        <div className="Artists-mainContent">
          <div className="Artists-profileBarAndList">
            <div className="Artists-profileBar">
              <div className="Artists-searchBtnContainer">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8UFBQAAAC4uLgREREODg4ICAgHBwezs7P19fX8/PzIyMj5+fnMzMylpaWvr6/q6urb29uQkJDt7e3U1NS/v7/i4uKIiIhVVVWgoKBNTU10dHQfHx+AgIA3NzeWlpZGRkZwcHBoaGhcXFwlJSU+Pj4uLi4aGhpWVlaDg4MrKytCQkKCr3KBAAAK8UlEQVR4nO1d53riMBAE4ULvvZcEUt7//c7mcgkXZlXsVQlf5uddsHcsabukSsUG2tNOrTvcHE7L/fP2vH3ez0+HzbBbG0+bVt7nEo1Od7MX/5DEcRxliJPk85+Wm+644VvMghh0D5criahKI7pyXa96U9/iGmLaPeWSxxJut4jzPz72+r7F1kVnts4E1iT3NZrZb96GA9/CqzHeGIwdGMt12CRHu2z0ZMtOi+RbN1TV0zoVH71vJI8d32Tu0exezNceCSHOdd+M/kd7yDN8X8gGchGOP9B4Lbv6EDLluguDYz5+7PT+cVz4Zpeha4vfB0ff67H1ZGF+/s9xO/bIb3Ri1i8IiVi1fRFc2JygN/A1VfvPbvhV86k6H7knuBCpK4LVfBhrjvk1ls4G8C8icXRqHDuOVuAthHCoVIemJiJKxT1Sw4fEouuIX3NuMoBXbpflatettQaDaX806k/HnVp3t5r/TXIYPEscnRCcVnUJ5mG7WA5rA2oFtQe12TIfTW2KZwc6taP51aNr6kUnYB8sXoSu654K6ymAnpYoGb1oZhDFNlsbTZKxaNkjl2OnM0OzpTcz13t5hkdjekR29c1GTTAbvvmk4ONrex0rZDOkWinfn/GblUl7Tlcak1UM2Rh9w1FFMGJIPTR2ao5ixsLnDgcFwYwfyxJp7pRz1Q5F1RQVYsf1qvZMxdHGRFUoGeY4ta+KrfnVjcJMiC23Je5cFG9kjop70telVhT4TD6MvKa/IyUo3u3UxaZvstdGgrHm2Jfp75hPw9xhI31xylbBaV4k3pTdwLQlc+TEM9drZPGgWNpN9Y3OspeveF4ylL1jw/MOCWSelOhxvEGiZSKeNygg/cIM2qZBL/ZYuClk1iUirMs/nl6EMae6lqJDUxSHsg/vkgQT4a47ZEwbf1E0GP1AnyaYumx/GZAUI1HOKr5TabDY4QjmGJATVZzKPJeco64J5hOVpFhinpJ6NLKf1LsDabUiUTyvcKIeajulB0HGN8Xdjhb5SBeG/h6k6S9stp4I/eXAVcOg5lS6L/Y8Ss2IJavYJjgTkUYxZdMk1EwsvDUOkIFqMeeNmvUuC5V3mFBCFdAMlKWwGNHrgMhpRsL8UTP8qJQtri6IC1Z/5snoNjUdfDdjj7kGkciPBtBKR6SmjVciXoXJ1orQZojgPDVVp4SH5MEdvQehTw1t4hp+J67cVkngtEOyN3kG9kgjj7b+FkRYbuSdYgfQsyn8AjaKJu7yiBhCezKboUHIpx8nYlPhrOlKDeyOGBTcYNgUzhBSg5hqBz3YbQjA2H/hFYuo63DBn5fJhvADq1PtQYD+jK0Oj4KA9Rpdl4uYpL5d7v9RSkioqNK5ZZFN8Ya0oaa6h5q0bHmAHTCLpKdNp1jP2JbYFNhgaPmV8OOIV+simwLqGq2pBn1Sr+knjFrhkUC2IkqsC2yMJmIYP6l/OICfJixj+Bd4mqpb3fEyDHDncaVecCHiL+NAYGPAGE9jtqF8ZLkyqzWcgaiJ0iJCMxNQZHgLWHdQTjdYaQ0ixXYPmHRTZmuwonEisDHwQlSpGpRRVs9tT4A6Q5Uu24MapL39DSWBdg8om6SQR+N8h6ouFmjCKYpjsOQUqKLBiWtVFARDp0BS3feA2RpFFxgyFlHVkcDmKDDjUEiin4Z0jgvSGnIfGpnDQCpOCHPQWKjQi8gRCqYgcw9UolEkTZHB99TjpQM4IHLrDW1oqOYQG0RFke2EXJoQw9+/QEGwwqlZIk8vVIOPowvFsQT7n8UQOTXpi/Qnz4hhuOdSIgdFYb63yISGVZO5BarPKHoyzoihh/N9NFGA4eOP4SMwlK9DqEt/mKaRVzrnyOKHV5X5hwL28If5NCjYU/g00C8Nrfz7BRjsyf3Sx48tHj8+fPwYH+ZpQms0+QJq9FUoRphrix3Ja44CpZmflS/F0srzpY+f88Z1C99n+VIoUreoLJFTE2InRg7Uc6CsPcH64d6FuAVQRRNO1WP6+DVg2LcZaHSB6/iqaBb3YoTU4v0F1K2t0USJuksD9WpQE62GqHA/SlBd7P+A66PqMAF3i/k4YUAFuL9OQ1LsCfnagS8DboTVOOkE9pcGaC+ggxmfNX6JmxPDy9XgHmEd9wsvxPCiYBT96o0E9BTCm6ZEr77Wb7dwv0VohWAUV+g2wsK2zeC8b7hTWTMtCHvZQ8vt4xOHdMtk+POEpWugntHubcKnmpQ8NYwX0C/Rz10T0zSkLlNiN7f2IKAm+KA2keLN5kLeo3ALfH5SQNl9Ygj1S0j46JZQjlSgdgEbeSX4+PVgcm740FYjRUEccxNIRZ9Fui08NiyQ3UGEcPp6JgcMTQIJomDwYy4bPmMovtgR2gRtpuOPoOsehLIhzoY27zagjmvzXYcijqvU2R77DcRhXwWexApijhapj1HHJnpOuxHHXxb68MRK9Js7Jc/jLNTzQ1z7HnnsxsRRT+Fz5AibWE10cpJW0KbOvC5qp5+p81DdXGF3D+paycK+FuH/eQuGyduKiq8b+pE+ehfIy3xKfHDK+HhxUAl3tOT9CJSyyRSq68I3db5u2Ro8efeD61PZybPFy6Y56fs7YqcUW7QccckEGTlPnU7UieQKj9JS0BfZRM78N1LJ8IRzCXk9SOTIaEjufEs5jv2lfMHrF3Rh+iXXEkY8uTHZrXL2Hbi27AZwrnUiu7zS9h3EA9ldj3xZeNnNYInV7Rg96Q2BfIXphuw9kb3KYpu8JIWd4lR6vatY2zH+LfXtwHwUaacpR2zj0MH2Uecaaz6K8ms6q6LKbf3rOtc7s1KkElOfwzjnLNuMt5qXrXNSVF06LsSGq9LfP2peUc9MkbjT45bjkINjf6U5QT1QzDjOyjoAU1N+rBRlt0l+cjyWCWc6c3N+rBQV6uaD47lbbLKOFutC/FgpSi7M/EKcDeTENPJu116E4i5uNxRbelKIjGRdf0n2eychqKsWXVOcppoTKSN5HrbU83U0eX0TRWenFYqNZ21psukq1ofFhPIF+q3FIf8S2pNT+iEYW2AlQTdmmQm2XM0W9UmrM87QmdS6u9X8cv0fXdelmkcxOzpryktRHrVB4VLxHanpM9I8oqdzf7wUp+vy68YUYnvVXK4oZjPVYHoxIP5MGzqjOGFQf/oQyZen5IyiXoTKglisbh0IZxSdDaNYf3N13VGsbEo6Ilr8QM7QIcXpsoQvqYNEHJHz55BiZfJkcTnGYksUm11SzOy/JY6xeKKzzU4pVrqphbmaiCdpacstxUpvbZI70kAqtqpqgWOKlcmeb7JGQsw1mj1cU6wMNoJlIDMnfaa3jcw5xUqzty+TiciRZMOnX8xyTzELanfn4iOZjd6+a5SO9EEx8wIWe5O4/QN5pPxiRi+HH4qVSmOyySN4zbG8hsdPr61CjTG+KFbyDNPs/RrMx7SKjZLrXyx1MlYUPFLMMZ3sjtubzEWaZLjJaLyv6DyVLjxTvKIx6NQXs83h9LLc7/fLl+NhM1zUO1OmWlUIFC3jl6Jv8TjwS9G3eBz4pehbPA78UvQtHgd+KfoWjwNyiiGeyWYMGUWf+woZIaPobdMdL6QUwzgUoiwkFAO9UNUYNEXlEbw/BSTFeO9bNC5QFCNvW5jZQVCMw73o0BiYYmBHspUDPhoz1LPXCwHe0BLKSVc8uKcYwNkzvPhOMQn3ytiiqP1Xs00CO9ySBbc7p0T1MZzSbxgdr6WhvAD0aGvwE/3uYb9druofNZI/fcOL1Qn6DiYAAAAASUVORK5CYII="
                  alt=""
                />
              </div>
              <input
                type="text"
                placeholder="Search artists..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {artistList.length > 0 ? (
              <div className="Artists-SongList">
                {artistList.map((artist, i) => createArtistCard(artist, i))}
              </div>
            ) : (
              <div className="Artists-noSearch">No artists found...</div>
            )}
          </div>
          {song ? (
            <div className="Artists-playingContainer">
              <div className="Artists-nowImage">
                <p>Now Playing...</p>
              </div>
              <div className="Artists-nowPlayingContainer">
                <img src={getArtistImgSrc(song.artistName)} alt="" />
                <div className="Artists-playingTitleContainer">
                  <p className="Artists-playingSongName">{song.songName}</p>
                  <p className="Artists-playingArtistName">{song.artistName}</p>
                </div>
                <audio
                  className="Artists-audioBar"
                  controls
                  preload="metadata"
                  loop
                  src={`http://localhost:8080/song/stream/${song.songFile}`}
                />
              </div>
            </div>
          ) : (
            <div className="Artists-playingContainer">
              <div className="Artists-nowImage">
                <p>Please select a song to play....</p>
              </div>
              <div className="Artists-nowPlayingContainer">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
                <div className="Artists-playingTitleContainer">
                  <p className="Artists-playingSongName" hidden>
                    SongName
                  </p>
                  <p className="Artists-playingArtistName" hidden>
                    ArtistName
                  </p>
                </div>
                <audio
                  className="Artists-audioBar"
                  controls
                  preload="metadata"
                  loop
                  hidden
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Artists;
