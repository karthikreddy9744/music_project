//music-project/server/routes/adminRoutes.js
const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const adminCtrl = require('../controllers/adminController');

router.get('/stats', requireAuth, requireRole('admin'), adminCtrl.getStats);

module.exports = router;
