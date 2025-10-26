const express = require('express');
const { transact, fetchTransactions } = require('../controllers/transController');
const { protect } = require('../services/authMiddleware');
const { validateTransaction } = require('../src/validators');

const router = express.Router();

router.post("/transact", protect, validateTransaction, transact);
router.get("/fetchTransactions", protect, fetchTransactions);

module.exports = router;
