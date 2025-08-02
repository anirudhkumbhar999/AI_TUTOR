const mongoose = require("mongoose");

const leetcodeSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  leetcodeSession: { type: String, required: true },
  csrfToken: { type: String, required: true }
});

module.exports = mongoose.model("LeetCodeSession", leetcodeSessionSchema);
