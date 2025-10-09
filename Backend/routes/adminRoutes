const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, ip: req.ip, time: new Date().toISOString() });
});

module.exports = router;
