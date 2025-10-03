//music-project/server/models/Content.js
const mongoose = require('mongoose');

const reviewSubSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const contentSchema = new mongoose.Schema(
  {
    contentType: { type: String, enum: ['news', 'music'], required: true },
    title: { type: String, required: true },
    body: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    media: [{
      mediaType: { type: String, enum: ['image', 'audio'] },
      url: String,
      description: String
    }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }],
    reviews: [reviewSubSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
