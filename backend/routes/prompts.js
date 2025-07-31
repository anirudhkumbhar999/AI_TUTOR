const express = require('express');
const router = express.Router();

// @route GET /api/prompts/:topic
router.get('/:topic', (req, res) => {
  res.send(`Fetch prompt for topic: ${req.params.topic}`);
});

module.exports = router;
