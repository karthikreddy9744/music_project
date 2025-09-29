//music-project/server/middlewares/roleMiddleware.js
exports.requireRole = (...roles) => {
  return (req, res, next) => {
    const userRoles = (req.user?.roles || []).map(r => r.name);
    // Debug statement
    console.log('User roles:', userRoles, 'Allowed roles:', roles);

    const allowed = roles.some(role => userRoles.includes(role));
    if (!allowed) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};
