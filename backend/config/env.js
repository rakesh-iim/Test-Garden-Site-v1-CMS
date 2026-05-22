const useInMemoryDb = String(process.env.USE_IN_MEMORY_DB || '').toLowerCase() === 'true';
const requiredEnv = ['JWT_SECRET', 'JWT_EXPIRES_IN'];

const validateEnv = () => {
  if (!useInMemoryDb) {
    requiredEnv.push('MONGO_URI');
  }

  const missing = [...new Set(requiredEnv)].filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }
};

const getCorsOrigin = () => {
  const value = process.env.CORS_ORIGIN;
  if (!value || value === '*') return true;

  return value.split(',').map((origin) => origin.trim()).filter(Boolean);
};

module.exports = {
  validateEnv,
  env: {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    corsOrigin: getCorsOrigin(),
    useInMemoryDb,
    authRateLimitMax: Number(process.env.AUTH_RATE_LIMIT_MAX || 10),
    authRateLimitWindowMs: Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    writeRateLimitMax: Number(process.env.WRITE_RATE_LIMIT_MAX || 120),
    writeRateLimitWindowMs: Number(process.env.WRITE_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  },
};
