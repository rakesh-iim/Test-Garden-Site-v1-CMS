const multer = require('multer');

const errorHandler = (err, req, res, next) => {
  if (!err) return next();

  if (typeof err.status === 'number') {
    return res.status(err.status).json({
      status: err.status >= 500 ? 'error' : 'fail',
      message: err.message || 'Request failed.',
    });
  }

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'fail',
        message: 'Uploaded file exceeds the 5MB limit.',
      });
    }

    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  console.error('Unhandled server error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
};

module.exports = {
  errorHandler,
};
