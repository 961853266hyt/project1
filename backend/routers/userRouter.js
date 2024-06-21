const express = require('express');
const { createUser, getAllUser, fetchUserById, getUserById, updatUserById } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', fetchUserById, getUserById);
router.patch('/:id', fetchUserById, updatUserById);
router.post('/', createUser);

module.exports = router;