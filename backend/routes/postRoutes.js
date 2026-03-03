const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getPosts, createPost, getPostById } = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: 'uploads/posts/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', verifyToken, upload.single('attachment'), createPost);

module.exports = router;
