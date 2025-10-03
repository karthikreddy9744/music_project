//music-project/server/routes/reviewsRoutes.js
const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/reviewsController');

// POST a new review to a specific piece of content (news)
router.post('/content/:contentId', requireAuth, ctrl.addReviewToContent);
// POST a new review to a specific festival
router.post('/festivals/:festivalId', requireAuth, ctrl.addReviewToFestival);

module.exports = router;
