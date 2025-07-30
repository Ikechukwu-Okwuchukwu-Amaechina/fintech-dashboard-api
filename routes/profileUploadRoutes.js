
const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const { uploadImage, uploadVideo } = require('../middleware/upload')
const imageController = require('../controllers/profileImageUploadController')
const videoController = require('../controllers/profileVideoUploadController')

router.post('/upload-image', protect, uploadImage.single('image'), imageController.uploadImage)
router.post('/upload-video', protect, uploadVideo.single('video'), videoController.uploadVideo)

module.exports = router
