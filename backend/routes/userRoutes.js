const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getProfile,
    getUserComments,
    getUserFavorites,
    updateUsername,
    updateEmail,
    updatePassword,
    updateAvatar,
    deleteAccount
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/avatars/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

router.get('/profile', protect, getProfile);
router.get('/profile/comments', protect, getUserComments);
router.get('/profile/favorites', protect, getUserFavorites);

router.put('/update-username', protect, updateUsername);
router.put('/update-email', protect, updateEmail);
router.put('/update-password', protect, updatePassword);
router.put('/update-avatar', protect, upload.single('avatar'), updateAvatar);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
