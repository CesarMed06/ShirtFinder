const express = require('express');
const { sendMessage } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/', sendMessage);

module.exports = router;