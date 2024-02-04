const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { upload } = require('./src/controllers/fileController');
const { handleFileUpload } = require('./src/middlewares/fileMiddleware');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

// File Upload Route
app.post('/upload', uploadMiddleware.single('file'), handleFileUpload, upload);

// Generic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
