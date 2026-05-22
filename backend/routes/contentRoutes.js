const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');

// Public route to fetch content (used by the main website)
router.get('/:pageId', getContent);

// CMS writes are temporarily open while auth is disabled.
router.put('/:pageId', updateContent);

module.exports = router;
