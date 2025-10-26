// Importe le framework Express
const express = require('express');

// Crée un nouveau routeur Express pour gérer les routes
const router = express.Router();

// Importe les fonctions du contrôleur utilisateur
const { getAllUsers, createUser } = require('../controllers/userController');

// Définit la route GET sur le chemin racine ('/') 
// Quand une requête GET est faite sur '/', la fonction getAllUsers est appelée
router.get('/', getAllUsers);

// Définit la route POST sur le chemin racine ('/')
// Quand une requête POST est faite sur '/', la fonction createUser est appelée
router.post('/', createUser);

// Exporte le routeur pour l'utiliser dans d'autres fichiers (comme app.js)
module.exports = router;