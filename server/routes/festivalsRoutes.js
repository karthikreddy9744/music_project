//music-project/servers/routes/festivalsRoutes.js
const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');
const ctrl = require('../controllers/festivalsController');

// Public
router.get('/', ctrl.list);

// Admin
router.post('/', requireAuth, requireRole('admin'), ctrl.create);
router.put('/:id', requireAuth, requireRole('admin'), ctrl.update);
router.delete('/:id', requireAuth, requireRole('admin'), ctrl.remove);

module.exports = router;
