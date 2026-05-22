const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { findUserByEmail, findUserById, createUser } = require('../services/dataStore');

// Generate JWT
const signToken = (id) => {
  return jwt.sign({ id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedName = String(name || '').trim();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');

    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ status: 'fail', message: 'Name, email, and password are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ status: 'fail', message: 'Invalid email address.' });
    }

    if (normalizedPassword.length < 8) {
      return res.status(400).json({ status: 'fail', message: 'Password must be at least 8 characters long.' });
    }

    if (!['admin', 'editor'].includes(role || 'admin')) {
      return res.status(400).json({ status: 'fail', message: 'Invalid role' });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(400).json({ status: 'fail', message: 'Email already exists' });
    }

    const newUser = await createUser({
      name: normalizedName,
      email: normalizedEmail,
      password: normalizedPassword,
      role: role || 'admin'
    });

    sendTokenResponse(newUser, 201, res);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');

    // 1) Check if email and password exist
    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    // 2) Check if user exists && password is correct
    const user = await findUserByEmail(normalizedEmail, { includePassword: true });

    if (!user || !(await user.comparePassword(normalizedPassword))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }

    // 3) If everything ok, send token to client
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
