const express = require('express');
const userController = require('../controllers/usersController');
const authMiddleware = require('../Midelware/authMiddleware');
const router = express.Router();

// Créer un utilisateur (Create a user)
router.post('/users', userController.createUser);

router.post('/login', userController.verifyToken)

// Récupérer tous les utilisateurs (Get all users - for authenticated users)
router.get('/users',  userController.getAllUsers);

router.get('/usersbyemail',  userController.getUserDataByEmail);

// Récupérer un utilisateur par ID (Get a user by UID)
router.get('/users/:uid',  userController.getUserById);

// Mettre à jour un utilisateur par ID (Update a user by UID)
router.put('/users/:uid',  userController.updateUser);

// Supprimer un utilisateur par ID (Delete a user by UID)
router.delete('/users/:uid',  userController.deleteUser);

module.exports = router;
