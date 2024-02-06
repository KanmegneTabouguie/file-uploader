import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Typography,
  Input,
  Paper,
  LinearProgress,
  Snackbar,
} from '@mui/material';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      await axios.post('http://localhost:3008/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });
  
      console.log('File uploaded successfully!');
      setSnackbarMessage('File uploaded successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Error uploading file. Please try again.');
      setSnackbarOpen(true);
    }
  };
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '30px', marginTop: '50px' }}>
        <Typography variant="h3" gutterBottom>
          File Uploader
        </Typography>
        <Input type="file" onChange={handleFileChange} style={{ margin: '20px 0', fontSize: '18px' }} />
        <Button variant="contained" color="primary" size="large" onClick={handleUpload} style={{ fontSize: '18px' }}>
          Upload
        </Button>
        {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} style={{ margin: '20px 0' }} />}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default App;
