// Backend/src/server.js (updated)
require('dotenv').config();

const path   = require('path');
const fs     = require('fs');
const http   = require('http');
const https  = require('https');
const mongoose = require('mongoose');
const app    = require('./app');

const PORT = process.env.PORT || 5050;

// On Render these env vars are set — run plain HTTP and let Render handle TLS.
const IS_RENDER = !!process.env.RENDER || !!process.env.RENDER_EXTERNAL_URL;

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log('✅ MongoDB connected');

    if (IS_RENDER) {
      // so req.ip uses X-Forwarded-For behind Render
      app.set('trust proxy', 1);

      app.listen(PORT, '0.0.0.0', () => {
        console.log(`✅ Server running (Render) on http://0.0.0.0:${PORT} — external URL is HTTPS via Render`);
      });
      return;
    }

    // Local dev: try HTTPS with self-signed certs, else fall back to HTTP.
    const keyPath  = path.join(__dirname, '..', 'certs', 'server.key');
    const certPath = path.join(__dirname, '..', 'certs', 'server.crt');

    try {
      const options = {
        key:  fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
      https.createServer(options, app).listen(PORT, '127.0.0.1', () => {
        console.log(`✅ Server running (local HTTPS) at https://127.0.0.1:${PORT}`);
      });
    } catch (e) {
      console.warn(`⚠️  Certs not found (${e.message}). Falling back to local HTTP.`);
      http.createServer(app).listen(PORT, '127.0.0.1', () => {
        console.log(`✅ Server running (local HTTP) at http://127.0.0.1:${PORT}`);
      });
    }
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
})();
