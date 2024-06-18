const express = require('express');
const { createCart, updateCartByUserId } = require('../controllers/cartController');

const router = express.Router();

router.post('/:userId', createCart);
router.patch('/:userId', updateCartByUserId);

module.exports = router;