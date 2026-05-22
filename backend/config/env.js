const useInMemoryDb = String(process.env.USE_IN_MEMORY_DB || '').toLowerCase() === 'true';
const storageProvider = String(process.env.STORAGE_PROVIDER || 'local').toLowerCase();
const requiredEnv = ['JWT_SECRET', 'JWT_EXPIRES_IN'];

const validateEnv = () => {
  if (!useInMemoryDb) {
    requiredEnv.push('MONGO_URI');
  }

  if (!['local', 'r2'].includes(storageProvider)) {
    throw new Error('STORAGE_PROVIDER must be either "local" or "r2"');
  }

  if (storageProvider === 'r2') {
    requiredEnv.push(
      'R2_ACCOUNT_ID',
      'R2_ACCESS_KEY_ID',
      'R2_SECRET_ACCESS_KEY',
      'R2_BUCKET_NAME',
      'R2_PUBLIC_BASE_URL'
    );
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
    storageProvider,
    authRateLimitMax: Number(process.env.AUTH_RATE_LIMIT_MAX || 10),
    authRateLimitWindowMs: Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    writeRateLimitMax: Number(process.env.WRITE_RATE_LIMIT_MAX || 120),
    writeRateLimitWindowMs: Number(process.env.WRITE_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    r2AccountId: process.env.R2_ACCOUNT_ID,
    r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,
    r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    r2BucketName: process.env.R2_BUCKET_NAME,
    r2PublicBaseUrl: process.env.R2_PUBLIC_BASE_URL,
    r2Endpoint: process.env.R2_ENDPOINT,
    r2KeyPrefix: process.env.R2_KEY_PREFIX || 'cms',
  },
};
