import React from "react";
import { useState,useEffect } from "react";
import "./Upload.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useUser } from "../../UserContext/UserContext"; 

const BASE_URL = "http://localhost:8080/song";

export default function Upload() {

  const navigate = useNavigate();
  const { user } = useUser();
  const { setUser} = useUser();

  const [isUploading,setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    songName: "",
    songFile: null,
    category: "bollywood",
  });

  useEffect(() => {
        if (!user) {
          navigate("/");
        }
      });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setIsUploading(true);
      const data = new FormData();


      data.append("songName", formData.songName);
      data.append("artistName", user.userName);
      data.append("category", formData.category);

      if (formData.songFile) {
        data.append("file", formData.songFile);
      }
      else{
        alert("Please provide the song file.")
        return;
      }
      let axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      try {
        const response = await axios.post(
          `${BASE_URL}/upload`,
          data,
          axiosConfig
        );
        if (response.status == 200) {
          console.log("Upload successful", response.data);
          
         
          let newUser = response.data;
          setUser(newUser);
          console.log(newUser.userSongs);
          alert("Song uploaded successfully.");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.error("Error", error.response.data);
        } else if (error.request) {
          console.error("No response from server", error.message);
        } else {
          console.error("Request error", error.message);
        }
      } finally{
        setIsUploading(false);
      }
    };


  return (
    <div className="container">
      <div className="form-container">

        <form className="form" onSubmit={handleSubmit}>
            <>
              <input
                type="text"
                name="songName"
                placeholder="Enter Song Name"
                value={formData.songName}
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="songFile"
                accept="mp3/*"
                onChange={handleChange}
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required 
                className="category-select"
              >
               
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
              <button type="submit" disabled={isUploading}>{isUploading ? "Uploading..." : "Upload Song"}</button>
            </>
        </form>
      </div>
    </div>
  );
}
