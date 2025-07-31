const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  language: String,
  code: String,
  output: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);
