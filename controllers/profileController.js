const User = require('../models/User');

// Handles profile image upload and updates user
exports.uploadProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Save file path to user
    const user = await User.findById(req.user._id);
    user.profileImage = req.file.path;
    await user.save();
    res.json({ message: 'Profile image uploaded', profileImage: req.file.path });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
