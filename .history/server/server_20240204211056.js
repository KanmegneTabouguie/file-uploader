const express = require('express');
const multer = require('multer');
const path = require('path');
const { upload } = require('./src/controllers/fileController');
const { handleFileUpload } = require('./src/middlewares/fileMiddleware');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

app.post('/upload', uploadMiddleware.single('file'), handleFileUpload, upload);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
