const fs = require('fs-extra');
const sharp = require('sharp');

// disable sharp cache
sharp.cache(false);

const rootDir = 'public/';

async function deleteFile(path) {
  if (path) {
    await fs.remove(rootDir + path);
  }
}

function validateType(ext) {
  const acceptType = ['jpg', 'png'];
  if (acceptType.indexOf(ext.toLowerCase()) < 0) {
    return false;
  }
  return true;
}

async function uploadPhoto(image, toPath, defaultName) {
  if (!image) {
    throw new Error('no image found');
  }
  const { path, name } = image;
  const ext = name.split('.').slice(-1)[0].toLowerCase();
  const imageName = defaultName || path.split('_')[1]; // original is upload_[hash]
  try {
    if (!validateType(ext)) {
      throw new Error('wrong file extenstion');
    }
    const imagePath = `${toPath}${imageName}.jpg`;
    await fs.ensureDir(rootDir + toPath);
    await sharp(path).toFile(rootDir + imagePath);
    return imagePath;
  } catch (error) {
    throw new Error(error.message);
  } finally { // unlink file in temp folder
    deleteFile(path);
  }
}

module.exports = {
  uploadPhoto, deleteFile,
};
