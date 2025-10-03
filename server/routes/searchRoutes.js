const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { requireAuth } = require('../middlewares/authMiddleware');

// @route   GET /api/search
router.get('/', requireAuth, searchController.searchAll);

module.exports = router;