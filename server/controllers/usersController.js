//music-project/server/controllers/usersController.js
const User = require('../models/User');

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').populate('roles');
    res.json(users);
  } catch (e) { next(e); }
};
