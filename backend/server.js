require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { validateEnv, env } = require('./config/env');
const { initializeStore } = require('./services/dataStore');
const { createRateLimiter, requireJsonBody, securityHeaders } = require('./middleware/security');
const { errorHandler } = require('./middleware/errorHandler');

validateEnv();

const app = express();
app.disable('x-powered-by');

// Middleware
app.use(securityHeaders);
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '256kb' }));
app.use('/api/auth', createRateLimiter({
  name: 'auth',
  maxRequests: env.authRateLimitMax,
  windowMs: env.authRateLimitWindowMs,
  message: 'Too many authentication attempts. Please try again later.',
}));
app.use(['/api/content', '/api/upload'], createRateLimiter({
  name: 'writes',
  maxRequests: env.writeRateLimitMax,
  windowMs: env.writeRateLimitWindowMs,
  message: 'Too many requests to CMS write endpoints. Please try again later.',
}));
app.use(['/api/auth', '/api/content', '/api/public'], requireJsonBody);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MrGardenr CMS API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const publicRoutes = require('./routes/publicRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  fallthrough: false,
  index: false,
  setHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'public, max-age=3600');
  },
}));
app.use(errorHandler);

// Storage connection
initializeStore()
  .then(() => {
    console.log(env.useInMemoryDb ? 'Using in-memory development store' : 'Connected to MongoDB');
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
