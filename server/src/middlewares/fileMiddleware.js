const { validateFile } = require('../utils/fileValidator');

const handleFileUpload = (req, res, next) => {
  try {
    // Middleware logic for handling file uploads
    if (!req.file) {
      throw new Error('No file provided');
    }

    // Validate file
    validateFile(req.file);


    // Move to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { handleFileUpload };
