const express = require('express');
const router = express.Router();
const { generateTeachingBySection } = require('../controllers/chatController');

router.post('/teach', generateTeachingBySection);


module.exports = router;
