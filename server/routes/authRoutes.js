//music-project/server/routes/authRoutes.js
const router = require('express').Router();
const { register, login, me } = require('../controllers/authController');
const { requireAuth } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);

module.exports = router;
