//music-project/server/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'No token' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.sub).select('-password').populate('roles', 'name');
    if (!req.user) return res.status(401).json({ message: 'Invalid token' });
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};
