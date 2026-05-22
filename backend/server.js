require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { validateEnv, env } = require('./config/env');
const { initializeStore } = require('./services/dataStore');

validateEnv();

const app = express();

// Middleware
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
