//music-project/server/models/Festival.js
const mongoose = require('mongoose');

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
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Festival', festivalSchema);
