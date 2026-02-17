const express = require('express');
const router = express.Router();
const { getProfile, getUserComments, getUserFavorites } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getProfile);
router.get('/profile/comments', protect, getUserComments);
router.get('/profile/favorites', protect, getUserFavorites);

module.exports = router;
