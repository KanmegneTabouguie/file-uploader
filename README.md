# File Uploader

This project is a simple file uploader application built with Node.js (Express) for the backend and React for the frontend.

## Features

- **File Upload:** Allows users to select and upload files.
- **File Validation:** Performs basic file validation (e.g., checks if the file is an image).
- **CORS Enabled:** Handles Cross-Origin Resource Sharing to allow frontend/backend communication.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

1. **Clone the Repository:**

    
    git clone https://github.com/your-username/file-uploader.git
    cd file-uploader
    

2. **Run the Application:**

    - Start the backend server:

        
        cd server
        npm start
        

    - Start the frontend application:

        cd ../client
        npm start
        

4. **Access the Application:**

    Open your browser and visit [http://localhost:3000](http://localhost:3000) to interact with the file uploader.

## Configuration

- **Backend Configuration:**

    - The backend server runs on [http://localhost:3008](http://localhost:3008) by default. You can change the port in `server.js` if needed.

- **Frontend Configuration:**

    - The frontend application runs on [http://localhost:3000](http://localhost:3000) by default. Update the API URL in `client/src/App.js` if the backend server is running on a different port.

## Stack

- **Frontend:**
  - React
  - Material-UI

- **Backend:**
  - Node.js (Express)
  - Multer

