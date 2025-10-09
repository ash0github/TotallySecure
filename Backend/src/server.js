require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5080;

// connect to MongoDB (works even if DB is empty; it just needs to be reachable)
mongoose.connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log('✅ MongoDB connected');

    const server = http.createServer(app);
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running (Render) on http://0.0.0.0:${PORT} — external URL is HTTPS via Render`);
    });

    server.on('error', (err) => {
      console.error('❌ Server error:', err);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err?.message || err);
    process.exit(1);
  });
