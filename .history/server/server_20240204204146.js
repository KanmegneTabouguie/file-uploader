const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const { validateFile } = require('./src/utils/fileValidator');
const { uploadFile } = require('./src/services/fileService');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Validate file
    validateFile(req.file);

    // Resize image (if applicable)
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 300, height: 300 })
      .toBuffer();

    // Save file to server
    const savedFilePath = await uploadFile(req.file.originalname, resizedImageBuffer);

    res.status(200).json({ success: true, message: 'File uploaded successfully', filePath: savedFilePath });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
