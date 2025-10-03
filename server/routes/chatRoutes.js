//music-project/server/routes/chatRoutes.js
const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const chatCtrl = require('../controllers/chatController');

router.post('/', requireAuth, chatCtrl.handleChat);

module.exports = router;