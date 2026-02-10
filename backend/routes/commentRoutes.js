const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/:shirtId', commentController.getCommentsByShirt);
router.post('/:shirtId', verifyToken, commentController.addComment);

module.exports = router;
