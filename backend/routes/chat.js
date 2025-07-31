const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/teach-topic', chatController.teachTopic);

module.exports = router;
