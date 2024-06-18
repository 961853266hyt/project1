const express = require('express');

const {
  createNewProduct,
  getAllProducts,
  fetchProductById,
  getProductById,
  updateProductById,
  deleteProductById
} = require('../controllers/productController');

const router = express.Router();

router.post('/', createNewProduct);
router.get('/', getAllProducts);
router.get('/:id', fetchProductById, getProductById);
router.patch('/:id', fetchProductById, updateProductById);
router.delete('/:id', fetchProductById, deleteProductById);

module.exports = router;