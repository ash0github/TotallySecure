const express = require('express');
const { fetchUser, dashboard } = require('../controllers/userController');
const { protect } = require('../services/authMiddleware');

const router = express.Router();

router.get("/fetchUser", protect, fetchUser);
router.get("/dashboard", protect, dashboard);

module.exports = router;
