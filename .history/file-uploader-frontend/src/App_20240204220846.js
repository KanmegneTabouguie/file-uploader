import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Typography, Input, Paper } from '@mui/material';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

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
      });

      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h4" gutterBottom>
          File Uploader
        </Typography>
        <Input type="file" onChange={handleFileChange} style={{ margin: '10px 0' }} />
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Paper>
    </Container>
  );
};

export default App;
