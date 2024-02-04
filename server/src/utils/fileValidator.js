const validateFile = (file) => {
    // Add your file validation logic here
    // Example: Check file type, size, etc.
  
    if (!file) {
      throw new Error('No file provided');
    }
  
    // Example: Check if the file is an image
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }
  };
  
  module.exports = { validateFile };
  