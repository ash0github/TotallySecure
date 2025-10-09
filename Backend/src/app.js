const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { ipAllowlist } = require('../services/ipAllowlist');

const app = express();
app.set('trust proxy', 1); // so req.ip is the real client behind Render/Cloudflare

app.use(express.json());
app.use(helmet());

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://localhost:4114';
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

// PUBLIC health checks (no allowlist)
app.get('/', (_req, res) =>
  res.send('TotallySecure backend is running. Try /totallysecure/ping')
);

app.get('/totallysecure/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Everything under /totallysecure/* will require IP allowlist
app.use('/totallysecure', ipAllowlist());

// Your existing routes
const authRoutes = require('../routes/authRoutes');
app.use('/totallysecure/auth', authRoutes);

// Simple admin router (also allowlisted)
const adminRoutes = require('../routes/adminRoutes'); // GET /totallysecure/admin/health
app.use('/totallysecure/admin', adminRoutes);

// 404 catch-all
app.use((req, res) => res.status(404).json({ error: 'Not found', path: req.originalUrl }));

module.exports = app;
