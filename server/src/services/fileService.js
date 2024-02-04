const fs = require('fs').promises;
const path = require('path');

const uploadFile = async (fileName, fileBuffer) => {
  const uploadPath = path.join(__dirname, '../../uploads', fileName);

  console.log('Upload Path:', uploadPath);

  await fs.writeFile(uploadPath, fileBuffer);

  return `/uploads/${fileName}`;
};

module.exports = { uploadFile };
