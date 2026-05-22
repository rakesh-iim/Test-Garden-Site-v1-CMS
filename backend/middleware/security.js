const WINDOW_MS = 15 * 60 * 1000;

const stores = new Map();

const getClientKey = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const forwarded = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  const ip = String(forwarded || req.socket.remoteAddress || req.ip || 'unknown')
    .split(',')[0]
    .trim();

  return `${ip}:${req.path}`;
};

const getStore = (name) => {
  if (!stores.has(name)) {
    stores.set(name, new Map());
  }

  return stores.get(name);
};

const createRateLimiter = ({ name, maxRequests, windowMs = WINDOW_MS, message }) => {
  const store = getStore(name);

  return (req, res, next) => {
    const key = getClientKey(req);
    const now = Date.now();
    const current = store.get(key);

    if (!current || current.resetAt <= now) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    current.count += 1;

    if (current.count > maxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
      res.setHeader('Retry-After', String(retryAfterSeconds));
      return res.status(429).json({
        status: 'fail',
        message,
      });
    }

    next();
  };
};

const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cache-Control', 'no-store');
  next();
};

const requireJsonBody = (req, res, next) => {
  if (req.method === 'GET' || req.method === 'DELETE') return next();
  if (req.is('application/json')) return next();

  return res.status(415).json({
    status: 'fail',
    message: 'Content-Type must be application/json.',
  });
};

module.exports = {
  securityHeaders,
  requireJsonBody,
  createRateLimiter,
};
