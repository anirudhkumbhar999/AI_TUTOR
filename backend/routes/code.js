const express = require('express');
const router = express.Router();

// @route POST /api/code/run
router.post('/run', (req, res) => {
  res.send('Execute code');
});

module.exports = router;
