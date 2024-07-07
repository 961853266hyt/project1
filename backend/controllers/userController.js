require('dotenv').config();
const User = require('../models/User');
const Cart = require('../models/Cart');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create new user
const createUser = async (req, res) => {
    const { email, password, role } = req.body; 

    try {
        const existingUser = await User.findOne({ email });
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role });
        const user = await newUser.save();

        // Create an empty cart for the new user
        const newCart = new Cart({ belongTo: user._id, products: [] });
        await newCart.save();

        const payload = {
            sub: user._id,
        };
      
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};

// get all users
const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message }); // 500 indicates that there was an error on the server
    }
};

// fetch user by ID
const fetchUserById = async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

// Directly respond with the user
const getUserById = (req, res) => {
    res.json(res.user);
};

// update user by ID
const updateUserById = async (req, res) => {
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.role != null) {
        res.user.role = req.body.role;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createUser,
    getAllUser,
    fetchUserById,
    getUserById,
    updateUserById
};