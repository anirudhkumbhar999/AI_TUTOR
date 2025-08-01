const express = require('express');
const router = express.Router();
const {
  createSubject,
  addSyllabusSection,
  getSubjectSyllabus,
  getAllSubjects,
  getSyllabusSectionById
} = require('../controllers/subjectController');

router.get('/', getAllSubjects);
// Create subject
router.post('/create', createSubject);

// Add syllabus section
router.post('/syllabus', addSyllabusSection);

// Get syllabus for subject
router.get('/:subjectId/syllabus', getSubjectSyllabus);

router.get('/section/:sectionId', getSyllabusSectionById);


module.exports = router;
