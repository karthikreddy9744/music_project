//music-project/server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    pronouns: { type: String },
    interests: [String],
    hobbies: [String],
    bio: { type: String, maxlength: 500 },
    address: { type: String },
    profilePicture: { type: String },
    password: { type: String, required: true },
    // role references
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
