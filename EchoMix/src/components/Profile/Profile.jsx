import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext/UserContext";
import "./Profile.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setProfileData({
        userName: user.userName,
        image: null,
      });
      console.log(user);
    }
  }, [user, navigate]);

  const imageId = user?.imgId;
  const profilePicSrc = imageId
    ? `http://localhost:8080/user/image/${imageId}`
    : "https://avatar.iran.liara.run/public/boy?username=Ash";

  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    userName: user?.userName || "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prev) => ({ ...prev, image: file }));
    }
  };
const handleSaveChanges = async (e) => {
  e.preventDefault();
  e.target.disabled = true;

  const trimmedName = profileData.userName.trim();
  if (!trimmedName || trimmedName.length < 2) {
    alert("Name must be at least 2 characters long.");
    e.target.disabled = false;
    return;
  }

  const formData = new FormData();
  formData.append("email", user.email);
  formData.append("userName", trimmedName);
  if (profileData.image) {
    formData.append("image", profileData.image);
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/user/update/by-email",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      const updatedUser = response.data;
      setUser(updatedUser);
      setIsEditing(false);
    } else {
      console.error("Update failed");
    }
  } catch (err) {
    console.error("Error:", err);
  }

  e.target.disabled = false;
};

  return (
    <>
      <header className="profile-header">
        <div className="header-title">EchoMix</div>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          <div className="image-wrapper">
            <img className="profile-image" src={profilePicSrc} alt="Profile" />
            
          </div>

          {isEditing ? (
            <>
              <input
                name="userName"
                value={profileData.userName}
                onChange={handleChange}
                className="profile-input"
              />
            </>
          ) : (
            <>
              <h2 className="profile-name">{user ? user.userName : ""}</h2>
            </>
          )}

          <button
            onClick={isEditing ? handleSaveChanges : handleToggleEdit}
            className="profile-button"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
