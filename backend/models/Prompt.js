const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Syllabus',
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Prompt', promptSchema);
