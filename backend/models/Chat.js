const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [
    {
      role: { type: String, enum: ['user', 'assistant'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Chat', chatSchema);
