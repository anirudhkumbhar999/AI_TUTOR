const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  sectionTitle: { type: String, required: true },
  content: { type: String, required: true }, // paragraph or bullet points
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Syllabus', syllabusSchema);
