<div align="center">
  <img src="https://img.icons8.com/color/96/000000/spotify--v1.png" alt="Echo Logo" width="80" height="80">
  
  # Echo Music Platform 🎵
  
  **A beautifully crafted, modern music streaming experience.**
  
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
  ![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
</div>

<br />

Welcome to the **Echo Music Platform**! Echo is a full-stack, responsive web application inspired by top-tier streaming services. It leverages the speed of Vite and React on the frontend, powered by a robust Spring Boot and MongoDB backend, to deliver a seamless and premium music listening experience.

---

## ✨ Key Features

Echo is packed with features designed to provide a rich user experience:

- 🎧 **High-Fidelity Audio Streaming**: Stream music tracks directly from the backend without buffering delays.
- 🎨 **Glassmorphism UI**: A stunning, modern, and responsive interface built with custom CSS and Framer Motion for buttery-smooth animations.
- 🔒 **Secure Authentication**: Complete Login and Signup flows utilizing Spring Security to keep user profiles and data secure.
- 🕒 **Recently Played History**: Automatically tracks your listening habits so you can easily jump back into your favorite jams.
- ❤️ **Like & Favorite System**: Instantly "Like" songs directly from the player to curate your personal library.
- 🔊 **Enhanced Player Controls**: Full playback controls, including an intuitive volume slider and track timeline.
- 🧑‍🎤 **Artist Profiles & Categorization**: Browse songs by your favorite artists, genres, and custom categories.

---

## 🏗️ Architecture & Tech Stack

The platform follows a decoupled Client-Server architecture.

### Frontend (`EchoMix/`)
- **Core**: React.js (v19) powered by Vite for lightning-fast HMR and building.
- **Styling**: Custom responsive CSS with Glassmorphism effects, Bootstrap, and Framer Motion for animations.
- **Icons & Assets**: FontAwesome, React-Icons, and Lottie animations.
- **HTTP Client**: Axios for seamless communication with the backend API.

### Backend (`EchoAppBackend/app/`)
- **Core**: Java 17 with Spring Boot (v3.2.1).
- **Database**: MongoDB (hosted on Atlas) using `spring-boot-starter-data-mongodb`.
- **Security**: Spring Security for endpoint protection and user authentication.
- **File Management**: Commons-IO and GridFS (MongoDB) for storing and streaming audio files and user avatars.

---

## 🚀 Detailed Setup Guide

To run this project locally, you will need to set up both the backend server and the frontend client.

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
* **Node.js** (v18.x or higher) and npm.
* **Java Development Kit (JDK)** (v17 or higher).
* **Git** for cloning the repository.

### 1. Database Configuration (Important)
The backend uses a cloud-hosted MongoDB Atlas database. 
* The connection string is pre-configured in `application.properties`.
* **Note:** To connect successfully, your current IP address must be whitelisted in the MongoDB Atlas dashboard. If the backend fails to start with a timeout error, it is likely due to IP restrictions.

### 2. Starting the Backend Server
1. Open your terminal and navigate to the backend directory:
   ```bash
   cd Echo-Music-Platform/EchoAppBackend/app
   ```
2. Use the provided Maven wrapper to build and run the application. You do not need to install Maven globally:
   ```bash
   # On Windows (PowerShell/CMD)
   .\mvnw spring-boot:run
   
   # On macOS/Linux
   ./mvnw spring-boot:run
   ```
3. Wait for the Spring Boot logo to appear and the console to state that Tomcat has started. The backend API will be available at `http://localhost:8080`.

### 3. Starting the Frontend Client
1. Open a **new** terminal window (keep the backend running) and navigate to the frontend directory:
   ```bash
   cd Echo-Music-Platform/EchoMix
   ```
2. Install the necessary node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Vite will provide a local URL (typically `http://localhost:5173`). Open this URL in your web browser to view and interact with the application.

---

## 📂 Repository Structure

An overview of the important directories:

```text
Echo-Music-Platform/
│
├── EchoAppBackend/                  # Backend Java Spring Boot Application
│   └── app/
│       ├── src/main/java/           # REST Controllers, Services, Models, and Repositories
│       ├── src/main/resources/      # application.properties (Config)
│       └── pom.xml                  # Maven dependencies
│
└── EchoMix/                         # Frontend React + Vite Application
    ├── public/                      # Static assets and images
    ├── src/
    │   ├── api/                     # Axios API endpoints logic
    │   ├── components/              # Reusable React components (Player, Navbar, Cards)
    │   ├── pages/                   # Top-level route components
    │   ├── UserContext/             # Global state management for User/Player
    │   ├── App.jsx                  # Main application router
    │   └── index.css                # Global styling and CSS variables
    ├── package.json                 # Node dependencies
    └── vite.config.js               # Vite configuration
```

---
*Developed with passion for music and code.*
