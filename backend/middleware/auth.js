const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { findUserById } = require('../services/dataStore');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // 1) Get token and check if it's there
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.slice(7).trim();
    }
    
    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'You are not logged in! Please log in to get access.' });
    }

    // 2) Verification token
    const decoded = jwt.verify(token, env.jwtSecret);

    // 3) Check if user still exists
    const currentUser = await findUserById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ status: 'fail', message: 'The user belonging to this token does no longer exist.' });
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({ status: 'fail', message: 'Invalid token or authorization error.' });
  }
};

exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ status: 'fail', message: 'You do not have permission to perform this action.' });
  }

  next();
};
