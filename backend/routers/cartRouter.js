const express = require('express');
const { createCart, getCartById, updateCartByUserId } = require('../controllers/cartController');

const router = express.Router();

router.post('/:userId', createCart);
router.get('/:userId', getCartById);
router.patch('/:userId', updateCartByUserId);

module.exports = router;