//music-project/server/routes/userRoutes.js
const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const { getAll } = require('../controllers/usersController');

router.get('/', requireAuth, getAll);

module.exports = router;
