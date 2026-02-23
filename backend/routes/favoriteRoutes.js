const express = require('express');
const router = express.Router();
const { addFavorite, removeFavorite, getUserFavorites, checkFavorite } = require('../controllers/favoriteController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/:shirtId', verifyToken, addFavorite);
router.delete('/:shirtId', verifyToken, removeFavorite);
router.get('/', verifyToken, getUserFavorites);
router.get('/check/:shirtId', verifyToken, checkFavorite);

module.exports = router;
