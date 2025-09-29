//music-project/server/models/Content.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    contentType: { type: String, enum: ['news', 'review'], required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    media: [{
      mediaType: { type: String, enum: ['image', 'video', 'audio'] },
      url: String,
      description: String
    }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
