const Article = require('../models/User');
// Fonction de test pour vérifier que l'API fonctionne correctement
const testApi = (req, res) => {
    // Répond avec un statut 200 (OK) et un objet JSON
    res.status(200).json({ 
        message: 'Le test a fonctionné !', 
        success: true  
    });
}

// Fonction pour créer un nouvel article
const createArticle = async (req, res) => {
    try {
        const newArticle = new Article({

            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        });
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    
        } catch (err) {
            res.status(400).json({ message: 'Erreur lors de la création de l\'article', error: err.message });
        }
}

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de recuperation des articles', error: err.message });
    }
}
// Récupère tous les articles depuis la base de données
// Exporte les fonctions pour les rendre disponibles dans d'autres fichiers
module.exports = { getAllArticles, createArticle };