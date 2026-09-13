# Echo Music Platform

Echo is a modern, responsive music streaming platform inspired by Spotify. It features a stunning glassmorphism UI, seamless audio streaming, and a full-stack architecture.

## 🎵 Features
- **Modern UI**: A beautifully crafted, responsive design using React and Framer Motion.
- **Audio Streaming**: Stream music directly from the backend.
- **Recently Played**: Keeps track of your listening history.
- **User Authentication**: Login and signup functionality.
- **Volume Control**: Easily adjust the volume of the playing track.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Axios, Framer Motion
- **Backend**: Java, Spring Boot, Spring Security, MongoDB
- **Database**: MongoDB (cloud-hosted on MongoDB Atlas)

---

## 🚀 Setup & Installation

Follow these steps to run the Echo Music Platform locally.

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **Java** (v17 or higher)
- **Maven** (included via wrapper in the project)

### 2. Backend Setup (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd EchoAppBackend/app
   ```
2. The `application.properties` file is pre-configured to connect to a MongoDB Atlas cluster.
3. Run the Spring Boot application using the Maven wrapper:
   ```bash
   # On Windows
   .\mvnw spring-boot:run
   
   # On macOS/Linux
   ./mvnw spring-boot:run
   ```
4. The backend server will start on `http://localhost:8080`.

### 3. Frontend Setup (React/Vite)
1. Navigate to the frontend directory:
   ```bash
   cd EchoMix
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the URL provided by Vite (usually `http://localhost:5173`).

---

## 📂 Project Structure

- `EchoAppBackend/` - Contains the Java Spring Boot application handling API requests, file streaming, and database connections.
- `EchoMix/` - Contains the React frontend code, built with Vite.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is open-source and available under the MIT License.
