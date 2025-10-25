const express = require('express');
const { transact, fetchTransactions } = require('../controllers/transController');
const {protect} = require('../services/authMiddleware');
const {verifyRole} = require('../services/roleMiddlware');

const router = express.Router();

router.post("/transact", protect, verifyRole('user'), transact);
router.get("/fetchTransactions", protect, verifyRole('user'), fetchTransactions);

module.exports = router;