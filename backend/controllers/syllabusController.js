// Get section by ID
const Syllabus = require('../models/Syllabus');

exports.getSectionById = async (req, res) => {
  try {
    const section = await Syllabus.findById(req.params.sectionId);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
