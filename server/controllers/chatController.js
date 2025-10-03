//music-project/server/controllers/chatController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Conversation = require('../models/Conversation');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

exports.handleChat = async (req, res, next) => {
  try {
    const { message, context } = req.body; // <-- Receive context
    if (!message) {
      return res.status(400).json({ message: 'Message is required.' });
    }

    // Find or create a conversation for the user
    let conversation = await Conversation.findOne({ userId: req.user._id });
    if (!conversation) {
      conversation = new Conversation({ userId: req.user._id, history: [] });
    }

    let fullMessage = message;
    // If context is provided, prepend it to the user's message for the AI
    if (context) {
      fullMessage = `Based on the following context, please answer the user's question.
Context: """${context}"""
---
User Question: ${message}`;
    }

    const chat = model.startChat({
      history: conversation.history,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(fullMessage);
    const response = result.response;
    const aiMessage = response.text();

    // Save the user message and the model's response to history
    conversation.history.push({ role: 'user', parts: [{ text: message }] });
    conversation.history.push({ role: 'model', parts: [{ text: aiMessage }] });
    await conversation.save();

    res.json({ reply: aiMessage });
  } catch (e) {
    console.error("AI Chat Error:", e);
    next(e);
  }
};