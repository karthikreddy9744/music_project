//music-project/server/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    track: {
      spotifyId: String,
      title: String,
      artist: String,
      album: String,
      durationMs: Number,
      previewUrl: String
    },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    contentRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
