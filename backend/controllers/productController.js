const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');

// create new product
const createNewProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, image_url, createdBy } = req.body;

        // check if createdBy user ID is valid
        const userExists = await User.exists({ _id: createdBy });
        if (!userExists) {
            return res.status(400).json({ message: 'Invalid createdBy user ID' });
        }

        const newProduct = new Product({ name, description, price, stock, category, image_url, createdBy });
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get product by ID
const fetchProductById = async (req, res, next) => {
    let product;
    try {
      product = await Product.findById(req.params.id);
      if (product == null) {
        return res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
};

// Directly respond with the product
const getProductById = (req, res) => {
    res.json(res.product);
};

// update product by ID 
const updateProductById = async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    if (req.body.stock != null) {
        res.product.stock = req.body.stock;
    }
    if (req.body.category != null) {
        res.product.category = req.body.category;
    }
    if (req.body.image_url != null) {
        res.product.image_url = req.body.image_url;  //Vender direct update stock
    }
    if (req.body.decreaseStock != null) {
        res.product.stock -= req.body.decreaseStock;  //User place order
    }
    try {
        const updatedProduct = await res.product.save(); 
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// delete product by ID
const deleteProductById = async (req, res) => {
    try {
        await res.product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  
module.exports = {
    createNewProduct,
    getAllProducts,
    fetchProductById,
    getProductById,
    updateProductById,
    deleteProductById
};