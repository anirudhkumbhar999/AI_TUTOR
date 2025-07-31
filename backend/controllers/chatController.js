const Syllabus = require('../models/Syllabus');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.teachTopic = async (req, res) => {
  const { subjectId, topic, style } = req.body;

  try {
    // 1. Get syllabus content for the selected subject
    const syllabusSections = await Syllabus.find({ subject: subjectId });

    // 2. Extract relevant section
    const relevantSection = syllabusSections.find(s =>
      s.sectionTitle.toLowerCase().includes(topic.toLowerCase())
    );

    if (!relevantSection) {
      return res.status(404).json({ error: "Topic not found in syllabus" });
    }

    const context = relevantSection.content;

    // 3. Prepare the prompt
    const prompt = `You are an expert CS tutor. Teach the topic "${topic}" in a ${style} style using only this syllabus content:\n\n${context}`;

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    // 4. Retry logic for Gemini call
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < 3; i++) {
      try {
        const result = await model.generateContent(prompt);
        const reply = result.response.text();
        return res.json({ answer: reply });
      } catch (err) {
        if (err.message.includes("429") && i < 2) {
          console.warn(`⚠️ Rate limited, retrying after 1s... [Attempt ${i + 1}]`);
          await delay(1000);
        } else {
          console.error("❌ Gemini API error:", err);
          return res.status(500).json({ error: 'Server error' });
        }
      }
    }

  } catch (err) {
    console.error("❌ Controller error:", err);
    res.status(500).json({ error: 'Server error' });
  }
};
