//music-project/server/routes/adminRoutes.js
const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

// Example placeholder
router.get('/stats', requireAuth, requireRole('admin'), async (req, res) => {
  res.json({ users: 0, content: 0, reviews: 0 });
});

module.exports = router;
