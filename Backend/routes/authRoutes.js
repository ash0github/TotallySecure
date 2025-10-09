const express = require('express');
const { register, login } = require('../controllers/authController');
const { protect } = require('../services/authMiddleware');
const { ipAllowlist } = require('../src/services/ipAllowlist'); // adjust path if needed

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// IP allowlist + your existing auth guard
router.get('/protected', ipAllowlist(), protect, (req, res) => {
  res.json({ message: 'Protected OK', ip: req.ip, ts: new Date() });
});

module.exports = router;
