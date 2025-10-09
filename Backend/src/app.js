const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { ipAllowlistDb } = require('../services/ipAllowlistDb');

const app = express();

// trust Render's proxy so req.ip is correct
app.set('trust proxy', 1);

app.use(express.json());
app.use(helmet());

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://localhost:4114';
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

// Public health
app.get('/', (_req, res) => {
  res.send('TotallySecure backend is running. Try /totallysecure/ping');
});

app.get('/totallysecure/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// --- Admin allowlist management API (token protected) ---
// Mounted BEFORE the IP allowlist so you can manage entries from anywhere with the token.
const adminAllowlistRoutes = require('../routes/adminAllowlistRoutes');
app.use('/totallysecure/admin/allowlist', adminAllowlistRoutes);

const { ipAllowlistDb } = require('../services/ipAllowlistDb');
app.use('/totallysecure', ipAllowlistDb());

// Your existing user routes
const authRoutes = require('../routes/authRoutes');
app.use('/totallysecure/auth', authRoutes);

// --- IP gate for the rest of /totallysecure (excludes /ping and admin routes above) ---
app.use('/totallysecure', ipAllowlistDb());
// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

module.exports = app;
