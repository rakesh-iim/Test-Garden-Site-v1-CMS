const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter (images only)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
  if (allowedMimeTypes.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.use(auth.protect);
router.use(auth.restrictTo('admin', 'editor'));

// Upload route (Single image)
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
    }
    
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({
      status: 'success',
      url: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ status: 'error', message: 'Server error during upload' });
  }
});

// Get all uploaded images
router.get('/', (req, res) => {
  try {
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Unable to scan uploads directory' });
      }
      
      const fileUrls = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => ({
          filename: file,
          url: `${req.protocol}://${req.get('host')}/uploads/${file}`
        }));
        
      res.status(200).json({
        status: 'success',
        data: fileUrls
      });
    });
  } catch (error) {
    console.error('Get uploads error:', error);
    res.status(500).json({ status: 'error', message: 'Server error listing uploads' });
  }
});

// Delete image route
router.delete('/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    // Basic path traversal protection
    const sanitizedFilename = path.basename(filename);
    const filePath = path.join(uploadDir, sanitizedFilename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ status: 'success', message: 'File deleted successfully' });
    } else {
      res.status(404).json({ status: 'fail', message: 'File not found' });
    }
  } catch (error) {
    console.error('Delete upload error:', error);
    res.status(500).json({ status: 'error', message: 'Server error deleting upload' });
  }
});

module.exports = router;
