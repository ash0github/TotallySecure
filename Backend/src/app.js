// Backend/src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// services is OUTSIDE src, so go up one level:
const { ipAllowlist } = require('../services/ipAllowlist');

const app = express();

/** Behind Render/any proxy, trust the first hop so req.ip is correct */
app.set('trust proxy', 1);

/** Security + JSON */
app.use(express.json());
app.use(helmet());

/** CORS: use env FRONTEND_ORIGIN when deployed; fall back to localhost for dev */
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://localhost:4114';
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

/** Root route (helpful landing / smoke test) */
app.get('/', (_req, res) => {
  res.send('TotallySecure backend is running. Try /totallysecure/ping');
});

/** Public health check */
app.get('/totallysecure/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

/** User routes (existing) */
const authRoutes = require('../routes/authRoutes');
app.use('/totallysecure/auth', authRoutes);

const adminRoutes = require('../routes/adminRoutes');
app.use('/totallysecure/admin', ipAllowlist(), adminRoutes);


/**
 * Optional: admin area protected by IP allowlist
 * Uncomment after creating Backend/routes/adminRoutes.js
 *
 * const adminRoutes = require('../routes/adminRoutes');
 * app.use('/totallysecure/admin', ipAllowlist(), adminRoutes);
 */

/** Optional: 404 handler for unknown endpoints (keeps logs clean) */
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

module.exports = app;
