const User = require('../models/User');

// create new user
const createUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const newUser = new User({ email, password, role });
        const user = await newUser.save();
        res.status(201).json(user); // 201 indicates that a new resource has been created
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 indicates that the request is invalid
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
const updatUserById = async (req, res) => {
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
    updatUserById
};