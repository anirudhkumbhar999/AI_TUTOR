const express = require('express');
const router = express.Router();
const { getSectionById } = require('../controllers/syllabusController');

router.get('/section/:sectionId', getSectionById);

module.exports = router;
