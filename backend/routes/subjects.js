const express = require('express');
const router = express.Router();
const {
  createSubject,
  addSyllabusSection,
  getSubjectSyllabus
} = require('../controllers/subjectController');

// Create subject
router.post('/create', createSubject);

// Add syllabus section
router.post('/syllabus', addSyllabusSection);

// Get syllabus for subject
router.get('/:subjectId/syllabus', getSubjectSyllabus);

module.exports = router;
