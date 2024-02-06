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
  Box,
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
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Paper elevation={3} sx={{ padding: '30px', width: '100%', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          File Uploader
        </Typography>
        <Input type="file" onChange={handleFileChange} sx={{ margin: '20px 0', fontSize: '18px' }} />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleUpload}
          sx={{ fontSize: '18px', backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
        >
          Upload
        </Button>
        {uploadProgress > 0 && (
          <Box sx={{ width: '100%', marginTop: '20px' }}>
            <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: '10px', borderRadius: '5px' }} />
          </Box>
        )}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        sx={{ bottom: '20px' }}
      />
    </Container>
  );
};

export default App;
