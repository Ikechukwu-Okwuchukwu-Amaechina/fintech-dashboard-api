const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const profileController = require('../controllers/profileController');


// router.post('/upload-profile', protect, upload.single('profile'), profileController.uploadProfile);

module.exports = router;
