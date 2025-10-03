//music-project/server/models/Festival.js
const mongoose = require('mongoose');

const reviewSubSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const festivalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {                                   // Coordinates for map usage
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: String,
    lineup: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reviews: [reviewSubSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Festival', festivalSchema);
