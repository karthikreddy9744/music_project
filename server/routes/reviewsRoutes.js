//music-project/server/routes/reviewsRoutes.js
const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/reviewsController');

// Public
router.get('/', ctrl.list);

// Authenticated users can create/update/delete their reviews (can be extended with ownership checks)
router.post('/', requireAuth, ctrl.create);
router.put('/:id', requireAuth, ctrl.update);
router.delete('/:id', requireAuth, ctrl.remove);

module.exports = router;
