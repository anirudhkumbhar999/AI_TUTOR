const Subject = require('../models/Subject');
const Syllabus = require('../models/Syllabus');

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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getSubjectSyllabus = async (req, res) => {
  try {
    const syllabus = await Syllabus.find({ subject: req.params.subjectId });
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
