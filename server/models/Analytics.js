//music-project/server/models/Analytics.js
const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    pageUrl: String,
    meta: Object
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analytics', analyticsSchema);
