// Backend/src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { ipAllowlist } = require('./services/ipAllowlist');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: "https://localhost:4114", // adjust for your real frontend in prod
  credentials: true
}));

// Public health endpoint
app.get('/totallysecure/ping', (req, res) => res.json({ ok: true }));

// ✅ Protect everything under /totallysecure/admin/*
app.use('/totallysecure/admin', ipAllowlist());

// Test protected route
app.get('/totallysecure/admin/health', (req, res) => {
  res.json({ ok: true, ip: req.ip, area: 'admin' });
});

// Public health check
app.get('/totallysecure/ping', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});


//existing routes
try {
  const authRoutes = require('../routes/authRoutes');
  app.use('/totallysecure/auth', authRoutes);
} catch {}

module.exports = app;
