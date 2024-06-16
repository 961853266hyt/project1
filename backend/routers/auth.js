require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ error: 'Invalid user' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const payload = {
      userId: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });
    res.json({ token });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;