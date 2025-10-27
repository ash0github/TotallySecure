const express = require('express'); 
const cookies = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// routes
const authRoutes = require('../routes/authRoutes');
const transRoutes = require('../routes/transRoutes');
const userRoutes = require('../routes/userRoutes');
const adminRoutes = require('../routes/adminRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
});
app.use(cookies());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "same-origin" },
}));
app.use(cors({
  origin: "https://localhost:4114",
  credentials: true
}));

// rate limit (global)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`⚠️ Rate limit exceeded: ${req.ip} tried ${req.method} ${req.originalUrl}`);
    res.status(429).json({
      status: 429,
      error: "Too many requests. Please try again later."
    });
  }
});
app.use(limiter);

// user + auth routes
app.use("/totallysecure/auth", authRoutes);
app.use("/totallysecure/transaction", transRoutes);
app.use("/totallysecure/user", userRoutes);

// admin routes
app.use("/totallysecure/admin", adminRoutes);

app.get('/', (req, res) => {
  res.send('TotallySecure!!');
});

module.exports = app;
