const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/user/me', verifyToken, commentController.getUserComments);
router.get('/:shirtId', commentController.getCommentsByShirt);
router.post('/:shirtId', verifyToken, commentController.addComment);
router.delete('/:commentId', verifyToken, commentController.deleteComment);

module.exports = router;
