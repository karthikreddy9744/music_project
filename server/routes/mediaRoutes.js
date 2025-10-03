// music-project/server/routes/mediaRoutes.js
const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const mediaCtrl = require('../controllers/mediaController');

// POST /api/media/upload
router.post('/upload', requireAuth, mediaCtrl.uploadMiddleware, mediaCtrl.handleUpload);

module.exports = router;