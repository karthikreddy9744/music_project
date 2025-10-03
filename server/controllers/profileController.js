//music-project/server/controllers/profileController.js
const User = require('../models/User');

// Get User Profile (GET /api/profile/me) - Auth required
exports.getProfile = async (req, res, next) => {
  try {
    // req.user is populated by requireAuth middleware
    const user = await User.findById(req.user._id).select('-password').populate('roles', 'name');
    if (!user) return res.status(404).json({ message: 'Profile not found' });
    res.json(user);
  } catch (e) { next(e); }
};

// Update User Profile (PUT /api/profile/me) - Auth required
exports.updateProfile = async (req, res, next) => {
  try {
    // These fields can be updated
    const updates = {
      name: req.body.name,
      gender: req.body.gender,
      pronouns: req.body.pronouns,
      interests: req.body.interests,
      hobbies: req.body.hobbies,
      bio: req.body.bio,
      address: req.body.address,
      profilePicture: req.body.profilePicture
    };

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true, // Return updated document
      runValidators: true // Enforce schema validation
    }).select('-password');

    if (!user) return res.status(404).json({ message: 'Profile not found' });
    res.json(user);
  } catch (e) {
    console.error(e);
    e.status = 400; // common validation issue
    next(e);
  }
};