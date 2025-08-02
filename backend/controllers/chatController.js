const Syllabus = require('../models/Syllabus');
const Prompt = require('../models/Prompt');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.teachChat = async (req, res) => {
  const { sectionId } = req.body;

  try {
    const section = await Syllabus.findById(sectionId);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    const prompt = await Prompt.findOne({ sectionId });
    if (!prompt || !prompt.content) {
      return res.status(404).json({ error: 'Prompt not found for this section' });
    }

    const cleanedPrompt = prompt.content.trim();
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const result = await model.generateContent(cleanedPrompt);
    const reply = result.response.text();

    res.json({ response: reply });
  } catch (err) {
    console.error("❌ /api/chat/teach error:", err);
    res.status(500).json({ error: 'AI teaching failed' });
  }
};

exports.doubtChat = async (req, res) => {
  const { question, sectionId } = req.body;

  try {
    const section = await Syllabus.findById(sectionId);
    if (!section) return res.status(404).json({ error: 'Section not found' });

    const context = section.content;

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const prompt = `You are a helpful tutor. The topic is:\n${context}\n\nStudent's question: ${question}`;
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ response: reply });
  } catch (err) {
    console.error("❌ /api/chat/doubt error:", err);
    res.status(500).json({ error: 'AI doubt solving failed' });
  }
};
