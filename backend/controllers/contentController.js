const { validatePageContent } = require('../validators/contentValidators');
const { findContentByPageId, upsertContentByPageId } = require('../services/dataStore');

// @desc    Get content for a specific page
// @route   GET /api/content/:pageId
// @access  Public
exports.getContent = async (req, res) => {
  try {
    const { pageId } = req.params;
    const errors = validatePageContent(pageId, {});
    if (errors[0]?.startsWith('Unsupported pageId')) {
      return res.status(404).json({
        status: 'fail',
        message: errors[0],
      });
    }

    const content = await findContentByPageId(pageId);
    
    if (!content) {
      // If no content exists yet, return an empty data object so the frontend doesn't crash
      return res.status(200).json({
        status: 'success',
        data: {}
      });
    }

    res.status(200).json({
      status: 'success',
      data: content.data
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ status: 'error', message: 'Server error fetching content' });
  }
};

// @desc    Update or Create content for a specific page
// @route   PUT /api/content/:pageId
// @access  Private (Admin only)
exports.updateContent = async (req, res) => {
  try {
    const { pageId } = req.params;

    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Content payload must be a JSON object.',
      });
    }

    const errors = validatePageContent(pageId, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid content payload',
        errors
      });
    }

    const newData = req.body; // The entire JSON payload containing the text/images

    // Use upsert to create if it doesn't exist, or update if it does.
    // Also using { new: true } to return the updated document.
    const content = await upsertContentByPageId(pageId, newData);

    res.status(200).json({
      status: 'success',
      message: 'Content updated successfully',
      data: content.data
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ status: 'error', message: 'Server error updating content' });
  }
};
