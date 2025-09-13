const express = require('express');
const {register, login} = require('../controllers/authController');
const {protect} = require('../services/authMiddleware');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", protect, (req, res) => {
    res.json({
        message: `Welcome to our TotallySecure route! You have accessed protected data.`,
        timestamp: new Date(),
    })
});

module.exports = router;