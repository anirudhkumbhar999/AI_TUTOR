const Prompt = require('../models/Prompt');

// Create Prompt (already done)
exports.createPrompt = async (req, res) => {
  const { sectionId, content } = req.body; // ✅ FIXED: content is now defined

  try {
    const prompt = new Prompt({ sectionId, content });
    await prompt.save();
    res.status(201).json(prompt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while saving prompt' });
  }
};


// ✅ Get Prompt by Section ID
exports.getPromptBySection = async (req, res) => {
  const { sectionId } = req.params;

  try {
    const prompt = await Prompt.findOne({ sectionId });

    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found for this section' });
    }

    res.json(prompt);
  } catch (err) {
    console.error('Error fetching prompt:', err);
    res.status(500).json({ error: 'Server error while fetching prompt' });
  }
};
