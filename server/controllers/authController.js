//music-project/server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const signToken = (userId) =>
  jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    let roleDoc = await Role.findOne({ name: role });
    if (!roleDoc) roleDoc = await Role.create({ name: role });
    const user = await User.create({ name, email, password, roles: [roleDoc._id] });
    res.status(201).json({ token: signToken(user._id), user: { id: user._id, name, email } });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('roles');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: signToken(user._id), user: { id: user._id, name: user.name, email: user.email, roles: user.roles } });
  } catch (e) { next(e); }
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};
