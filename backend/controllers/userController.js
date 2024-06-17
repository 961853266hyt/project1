const express = require('express');
const router = express.Router();
const User = require('../models/User');

// create new user
router.post('/', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const newUser = new User({ email, password, role });
        const user = await newUser.save();
        res.status(201).json(user); // 201 indicates that a new resource has been created
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 indicates that the request is invalid
    }
});

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message }); // 500 indicates that there was an error on the server
    }
});

// get user by ID
router.get('/:id', getUserById, (req, res) => {
    res.json(res.user);
});

// update user by ID
router.patch('/:id', getUserById, async (req, res) => {
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
});

module.exports = router;
