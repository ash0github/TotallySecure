const express = require('express');
const {updateTransactionStatus, fetchApprovedRejected, fetchPendingFlagged, fetchUsers} = require('../controllers/adminTransController');
const {protect} = require('../services/authMiddleware');
const {verifyRole} = require('../services/roleMiddlware');

const router = express.Router();

router.post("/updateStatus", protect, verifyRole('admin'), updateTransactionStatus);
router.post("/fetchHistory", protect, verifyRole('admin'), fetchApprovedRejected);
router.post("/fetchTransactions", protect, verifyRole('admin'), fetchPendingFlagged);
router.post("/fetchUsers", protect, verifyRole('admin'), fetchUsers);

module.exports = router;