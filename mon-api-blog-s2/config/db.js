// Importation du module Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définition d'une fonction asynchrone pour se connecter à la base de données MongoDB
const connectDB = async () => {
    try {
        // Tentative de connexion à MongoDB en utilisant l'URL contenue dans le fichier .env
        await mongoose.connect(process.env.MONGODB_URI);

        // Si la connexion réussit, un message est affiché dans la console
        console.log('Connexion à MongoDB réussie !');
    } catch (err) {
        // En cas d’erreur, le message d’erreur est affiché
        console.error('Erreur de connexion à MongoDB :', err.message);

        // Le processus est arrêté avec un code d’erreur (1)
        process.exit(1);
    }
};

// Exportation de la fonction pour l’utiliser ailleurs (ex: dans server.js)
module.exports = connectDB;
