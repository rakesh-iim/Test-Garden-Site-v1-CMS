const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middleware/auth');
const { createMedia, listMedia, findMediaById, deleteMediaById } = require('../services/dataStore');
const { uploadMediaObject, deleteMediaObject } = require('../services/objectStorage');

const router = express.Router();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
  if (allowedMimeTypes.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, GIF, and WEBP image files are allowed.'), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.use(auth.protect);
router.use(auth.restrictTo('admin', 'editor'));

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
    }

    const metadata = await sharp(req.file.buffer).metadata();
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const storedObject = await uploadMediaObject({ file: req.file, baseUrl });

    const media = await createMedia({
      filename: req.file.originalname,
      storageKey: storedObject.storageKey,
      url: storedObject.url,
      provider: storedObject.provider,
      mimeType: req.file.mimetype,
      size: req.file.size,
      width: metadata.width,
      height: metadata.height,
      uploadedBy: req.user?._id,
    });

    res.status(200).json({
      status: 'success',
      data: {
        id: String(media._id || media.id),
        filename: media.filename,
        url: media.url,
        provider: media.provider,
        mimeType: media.mimeType,
        size: media.size,
        width: media.width,
        height: media.height,
        createdAt: media.createdAt,
      },
    });
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ status: 'error', message: 'Server error during upload' });
  }
});

router.get('/', async (req, res) => {
  try {
    const mediaFiles = await listMedia();
    res.status(200).json({
      status: 'success',
      data: mediaFiles.map((file) => ({
        id: String(file._id || file.id),
        filename: file.filename,
        url: file.url,
        provider: file.provider,
        mimeType: file.mimeType,
        size: file.size,
        width: file.width,
        height: file.height,
        createdAt: file.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get uploads error:', error);
    res.status(500).json({ status: 'error', message: 'Server error listing uploads' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const media = await findMediaById(req.params.id);
    if (!media) {
      return res.status(404).json({ status: 'fail', message: 'File not found' });
    }

    await deleteMediaObject(media.storageKey, media.provider);
    await deleteMediaById(req.params.id);

    res.status(200).json({ status: 'success', message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete upload error:', error);
    res.status(500).json({ status: 'error', message: 'Server error deleting upload' });
  }
});

module.exports = router;
