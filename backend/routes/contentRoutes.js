const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');
const auth = require('../middleware/auth');

router.use(auth.protect);
router.use(auth.restrictTo('admin', 'editor'));
router.get('/:pageId', getContent);
router.put('/:pageId', updateContent);

module.exports = router;
