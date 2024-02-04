const { uploadFile } = require('../services/fileService');

const upload = async (req, res) => {
  try {
    // Business logic for file upload
    const savedFilePath = await uploadFile(req.file.originalname, req.file.buffer);
    res.status(200).json({ success: true, message: 'File uploaded successfully', filePath: savedFilePath });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { upload };
