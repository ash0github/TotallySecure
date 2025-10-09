const express = require('express');
const router = express.Router();

// GET /totallysecure/admin/health  (this route is allowlisted via app.js)
router.get('/health', (req, res) => {
  res.json({
    ok: true,
    ip: req.ip,
    time: new Date().toISOString(),
  });
});

module.exports = router;
