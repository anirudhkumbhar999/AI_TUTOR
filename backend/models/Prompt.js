const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  subject: String,
  topic: String,
  content: String,   // the actual pre-written prompt
  tags: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Prompt', promptSchema);
