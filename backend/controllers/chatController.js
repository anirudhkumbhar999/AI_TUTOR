const Prompt = require('../models/Prompt');
const Syllabus = require('../models/Syllabus');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateTeachingBySection = async (req, res) => {
  const { sectionId } = req.body;

  try {
    const section = await Syllabus.findById(sectionId);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    const prompt = await Prompt.findOne({ sectionId });
    if (!prompt || !prompt.content || typeof prompt.content !== 'string') {
      return res.status(404).json({ error: 'Prompt not found or invalid content for this section' });
    }

    const cleanedPrompt = prompt.content.replace(/\s+/g, ' ').trim();
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const result = await model.generateContent(cleanedPrompt);
    const reply = result.response.text();

    res.json({ response: reply });
  } catch (err) {
    console.error("❌ /api/chat/teach error:", err);

    if (err.status === 503) {
      return res.status(503).json({
        error: '🤖 Gemini AI model is overloaded. Please try again after a few minutes.'
      });
    }

    res.status(500).json({ error: 'AI teaching failed. Try again later.' });
  }
};

