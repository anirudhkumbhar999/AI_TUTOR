const express = require('express');
const router = express.Router();

const {
  createPrompt,
  getPromptBySection
} = require('../controllers/promptController');

router.post('/', createPrompt);
router.get('/:sectionId', getPromptBySection);

module.exports = router;
