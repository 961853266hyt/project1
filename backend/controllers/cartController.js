const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

// Create a cart for every user
const createCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ belongTo: userId });
    if (cart) {
      return res.status(200).json(cart);
    }

    const newCart = new Cart({ belongTo: userId, products: [] });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a cary by id
const getCartById = async (req, res) => {
  const { userId } = req.params;
  try{
    const cart = await Cart.findOne({ belongTo: userId }).populate('products.product');
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
};

// Update cart (add or remove products)
const updateCartByUserId = async (req, res) => {
  const userId = req.params.userId;
  const { productId, action, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ belongTo: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productInCart = cart.products.find(item => item.product.toString() === productId);
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (action === 'add') {
      if (productInCart) {
        if (productInCart.number < product.stock) {
          productInCart.number += 1;
        } 
        else {
          return res.status(400).json({ message: 'Cannot add more than available stock' });
        }
      } 
      else {
        if (product.stock > 0) {
          cart.products.push({ product: productId, number: 1 });
        } 
        else {
          return res.status(400).json({ message: 'Product out of stock' });
        }
      }
    }

    if (action === 'minus') {
      if (productInCart) {
        productInCart.number -= 1;
        if (productInCart.number <= 0) {
          cart.products = cart.products.filter(item => item.product.toString() !== productId);
        }
      } 
      else {
        return res.status(400).json({ message: 'Product not in cart' });
      }
    }

    if (action === 'update') {
      if (productInCart) {
        if (quantity > product.stock) {
          return res.status(400).json({ message: 'Cannot add more than available stock' });
        }
        if (quantity <= 0) {
          cart.products = cart.products.filter(item => item.product.toString() !== productId);
        } 
        else {
          productInCart.number = quantity;
        }
      } 
      else {
        return res.status(400).json({ message: 'Product not in cart' });
      }
    }

    if (action === 'remove') {
      cart.products = cart.products.filter(item => item.product.toString() !== productId);
    }

    await cart.save();
    res.json(cart);
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCart, getCartById, updateCartByUserId };