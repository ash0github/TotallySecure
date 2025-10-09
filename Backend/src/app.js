const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// ⬅️ services is OUTSIDE src, so go up one level:
const { ipAllowlist } = require('../services/ipAllowlist');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: "https://localhost:4114", // change to your real frontend in prod
  credentials: true
}));

// Public health check (no allowlist)
app.get('/totallysecure/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Your existing user routes
const authRoutes = require('../routes/authRoutes');
app.use('/totallysecure/auth', authRoutes);

/*
 * If you want a separate admin area, uncomment these two lines
 * after creating Backend/routes/adminRoutes.js:
 *
 * const adminRoutes = require('../routes/adminRoutes');
 * app.use('/totallysecure/admin', ipAllowlist(), adminRoutes);
 */

module.exports = app;
