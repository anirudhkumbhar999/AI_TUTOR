const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/prompts', require('./routes/prompts'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/code', require('./routes/code'));
app.use('/api/subjects', require('./routes/subjects'));


// Example test route
app.get('/', (req, res) => {
  res.send('MERN Learning Platform Backend is Running 🚀');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
