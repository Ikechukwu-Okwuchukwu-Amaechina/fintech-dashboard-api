const path = require('path')

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }
  const ext = path.extname(req.file.originalname).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
    return res.status(400).json({ message: 'Invalid file type' })
  }
  if (req.file.size > 20 * 1024 * 1024) {
    return res.status(400).json({ message: 'File too large' })
  }
  res.json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` })
}
