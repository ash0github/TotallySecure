const express = require('express');
const { transact, fetchTransactions } = require('../controllers/transController');
const {protect} = require('../services/authMiddleware');

const router = express.Router();

router.post("/transact", protect, transact);
router.get("/fetchTransactions", protect, fetchTransactions);

module.exports = router;