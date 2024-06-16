const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, password, title } = req.body;

  try {
    const newUser = new User({ name, password, title });
    await newUser.save();
    res.status(201).json(newUser);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser
};