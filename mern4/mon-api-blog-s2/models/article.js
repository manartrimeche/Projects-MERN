// Importation de Mongoose (outil pour interagir avec MongoDB)
const mongoose = require("mongoose");

// Définition du schéma de données pour un article
const articleSchema = new mongoose.Schema({

    // Champ "title" : le titre de l’article
    title: {
        type: String, // Le titre doit être une chaîne de caractères
        required: [true, "Le titre est obligatoire"], // Ce champ est requis, sinon ce message s’affiche
        trim: true // Supprime les espaces en début et fin de texte
    },

    // Champ "content" : le contenu de l’article
    content: {
        type: String, // Chaîne de caractères
        default: 'Anonyme' // Valeur par défaut si aucun contenu n’est fourni
    },

    // Champ "createdAt" : la date de création de l’article
    createdAt: {
        type: Date, // Type Date
        default: Date.now // Défini automatiquement à la date actuelle
    }
});

// Exportation du modèle "Article" basé sur ce schéma
// Le premier argument "Article" correspondra au nom de la collection ("articles") dans MongoDB
module.exports = mongoose.model("Article", articleSchema);
