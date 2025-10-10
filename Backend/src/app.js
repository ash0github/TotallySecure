const express = require('express');
const cookies = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

//routes
const authRoutes = require('../routes/authRoutes');
const transRoutes = require('../routes/transRoutes');
const userRoutes = require('../routes/userRoutes');

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

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 100, // limit each IP to 100 requests per windowMs
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
app.use(limiter); //Apply globally

app.use("/totallysecure/auth", authRoutes);
app.use("/totallysecure/transaction", transRoutes);
app.use("/totallysecure/user", userRoutes);

app.get('/', (req, res) => {
    res.send('TotallySecure!!');
});

module.exports = app;