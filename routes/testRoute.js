const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/admin-only', protect, (req, res) => {
  if (req.user && req.user.role === 'admin') {
    return res.json({ message: 'Admin access granted' });
  } else {
    return res.status(403).json({ message: 'Admin access required' });
  }
});

module.exports = router;
