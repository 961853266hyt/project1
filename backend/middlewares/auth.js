require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];
  
//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   const tokenParts = token.split(' ');
//   if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
//     return res.status(400).json({ error: 'Malformed token' });
//   }

//   const actualToken = tokenParts[1];
//   console.log('Token received:', actualToken);

//   jwt.verify(actualToken, SECRET, (err, decoded) => {
//     if (err) {
//       console.error('Token verification failed:', err);
//       return res.status(403).json({ error: 'Failed to authenticate token' });
//     }
  

//     console.log('decoded user', decoded);
//     req.user = decoded;
//     next();
//   });
// };

// module.exports = { verifyToken };
const User = require('../models/User');
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(400).json({ error: 'Malformed token' });
  }

  const actualToken = tokenParts[1];

  jwt.verify(actualToken, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    try {
      const user = await User.findById(decoded.sub);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      req.user = user; 
      next();
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  });
};

module.exports = { verifyToken };