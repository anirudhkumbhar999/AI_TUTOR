const Subject = require('../models/Subject');
const Syllabus = require('../models/Syllabus');

// ✅ Create a new subject
exports.createSubject = async (req, res) => {
  const { name, description } = req.body;

  try {
    const subject = new Subject({
      name,
      description,
      createdBy: req.userId || null
    });

    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    console.error("Error creating subject:", err);
    res.status(500).json({ error: 'Failed to create subject' });
  }
};

// ✅ Add a syllabus section to a subject
exports.addSyllabusSection = async (req, res) => {
  const { subjectId, sectionTitle, content } = req.body;

  try {
    const syllabus = new Syllabus({
      subject: subjectId,
      sectionTitle,
      content
    });

    await syllabus.save();
    res.status(201).json(syllabus);
  } catch (err) {
    console.error("Error adding syllabus section:", err);
    res.status(500).json({ error: 'Failed to add syllabus section' });
  }
};

// ✅ Get all syllabus sections for a specific subject
exports.getSubjectSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.find({ subject: req.params.subjectId });

    if (!syllabus.length) {
      return res.status(404).json({ message: 'No syllabus found for this subject' });
    }

    res.json(syllabus);
  } catch (err) {
    console.error("Error fetching syllabus:", err);
    res.status(500).json({ error: 'Failed to fetch syllabus' });
  }
};

// ✅ Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
};
