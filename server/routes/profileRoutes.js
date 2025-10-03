//music-project/server/routes/profileRoutes.js
const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const profileCtrl = require('../controllers/profileController');

// GET /api/profile/me (Get logged in user's profile)
router.get('/me', requireAuth, profileCtrl.getProfile);

// PUT /api/profile/me (Update logged in user's profile)
router.put('/me', requireAuth, profileCtrl.updateProfile);

module.exports = router;