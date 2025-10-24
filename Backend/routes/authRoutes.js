const express = require('express');
const {register, login, adminLogin, verifyOTP} = require('../controllers/authController');
const {protect} = require('../services/authMiddleware');
const {verifyRole} = require('../services/roleMiddlware');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login/admin", adminLogin);
router.post("/verifyOTP", verifyOTP);

router.get("/protected", protect, (req, res) => {
    res.json({
        message: `Welcome to our TotallySecure route! You have accessed protected data.`,
        timestamp: new Date(),
        authenticated: true,
        user: req.user,
    })
});

module.exports = router;