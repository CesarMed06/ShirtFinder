const express = require('express');
const router = express.Router();
const { getPosts, createPost, getPostById } = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', verifyToken, createPost);

module.exports = router;
