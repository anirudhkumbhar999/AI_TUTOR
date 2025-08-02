const express = require('express');
const { teachChat, doubtChat } = require('../controllers/chatController');
const router = express.Router();

router.post('/teach', teachChat);
router.post('/doubt', doubtChat);

module.exports = router;
