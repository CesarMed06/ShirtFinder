const express = require('express');
const router = express.Router();
const shirtController = require('../controllers/shirtController');

router.get('/search', shirtController.searchShirts);
router.get('/', shirtController.getAllShirts);
router.get('/:id', shirtController.getShirtById);
router.post('/', shirtController.createShirt);
router.put('/:id', shirtController.updateShirt);
router.delete('/:id', shirtController.deleteShirt);

module.exports = router;
