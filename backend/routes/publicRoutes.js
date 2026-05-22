const express = require('express');
const { getContent } = require('../controllers/contentController');

const router = express.Router();

// Public API for the main website. Keep this namespace stable for site integrations.
router.get('/content/:pageId', getContent);

module.exports = router;
