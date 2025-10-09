const express = require('express');
const { register, login } = require('../controllers/authController');
const { protect } = require('../services/authMiddleware');

// ⬅️ services is a sibling of routes, so '../services/...'
const { ipAllowlist } = require('../services/ipAllowlist.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// IP allowlist + your auth guard
router.get('/protected', ipAllowlist(), protect, (req, res) => {
  res.json({
    message: 'Welcome to our TotallySecure route! You have accessed protected data.',
    timestamp: new Date(),
  });
});

module.exports = router;
