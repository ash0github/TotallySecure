require('dotenv').config();

const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5080;
const IS_RENDER = !!process.env.RENDER || !!process.env.RENDER_EXTERNAL_URL;

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log('✅ MongoDB connected');

    if (IS_RENDER) {
      app.set('trust proxy', 1);
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`✅ Server running (Render) on http://0.0.0.0:${PORT} — external URL is HTTPS via Render`);
        console.log('👉 Your service is live ✅');
      });
      return;
    }

    // Local: HTTPS if certs exist, otherwise HTTP
    const keyPath  = path.join(__dirname, '..', 'certs', 'server.key');
    const certPath = path.join(__dirname, '..', 'certs', 'server.crt');
    try {
      const options = { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) };
      https.createServer(options, app).listen(PORT, '127.0.0.1', () => {
        console.log(`✅ Listening (local HTTPS) at https://127.0.0.1:${PORT}`);
      });
    } catch (e) {
      console.warn(`⚠️  Certs not found (${e.message}). Falling back to local HTTP.`);
      http.createServer(app).listen(PORT, '127.0.0.1', () => {
        console.log(`✅ Listening (local HTTP) at http://127.0.0.1:${PORT}`);
      });
    }
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
})();
