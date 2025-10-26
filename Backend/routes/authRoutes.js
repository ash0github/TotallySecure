const express = require('express');
const { register, login, verifyOTP } = require('../controllers/authController');
const { protect } = require('../services/authMiddleware');
const { validateRegister, validateLogin, validateVerifyOTP } = require('../src/validators');

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/verifyOTP", validateVerifyOTP, verifyOTP);

router.get("/protected", protect, (req, res) => {
  res.json({
    message: `Welcome to our TotallySecure route! You have accessed protected data.`,
    timestamp: new Date(),
    authenticated: true,
    user: req.user,
  });
});

module.exports = router;
