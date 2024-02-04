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
      <Paper elevation={3} style={{ padding: '30px', marginTop: '50px' }}>
        <Typography variant="h3" gutterBottom>
          File Uploader
        </Typography>
        <Input type="file" onChange={handleFileChange} style={{ margin: '20px 0', fontSize: '18px' }} />
        <Button variant="contained" color="primary" size="large" onClick={handleUpload} style={{ fontSize: '18px' }}>
          Upload
        </Button>
      </Paper>
    </Container>
  );
};

export default App;
