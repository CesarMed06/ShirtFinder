const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getPosts, createPost, getPostById, getReplies, createReply, getUserPosts, deletePost } = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: 'uploads/posts/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get('/', getPosts);
router.get('/my-posts', verifyToken, getUserPosts);
router.get('/:id', getPostById);
router.get('/:id/replies', getReplies);
router.post('/', verifyToken, upload.single('attachment'), createPost);
router.post('/:id/replies', verifyToken, createReply);
router.delete('/:id', verifyToken, deletePost);

module.exports = router;
