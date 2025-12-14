const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUserById } = require('../controllers/userController');

// Routes pour les utilisateurs
router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);

module.exports = router;