
const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext
    cb(null, uniqueName)
  }
})

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext
    cb(null, uniqueName)
  }
})

function imageFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase()
  const allowed = ['.jpg', '.jpeg', '.png', '.gif'];
  const forbidden = ['.exe', '.sh', '.bat', '.js', '.php', '.py'];
  if (forbidden.includes(ext)) {
    return cb(new Error('Executable or script files are not allowed!'), false);
  }
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type! Only images are allowed.'), false);
  }
}

function videoFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase()
  const allowed = ['.mp4', '.mov'];
  const forbidden = ['.exe', '.sh', '.bat', '.js', '.php', '.py'];
  if (forbidden.includes(ext)) {
    return cb(new Error('Executable or script files are not allowed!'), false);
  }
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type! Only videos are allowed.'), false);
  }
}

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 20 * 1024 * 1024 }
})

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
  limits: { fileSize: 20 * 1024 * 1024 }
})

module.exports = { uploadImage, uploadVideo }
