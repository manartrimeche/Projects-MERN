const Article = require('../models/Article');

// Fonction pour créer un nouvel article
const createArticle = async (req, res) => {
    try {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            category: req.body.category
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
        res.status(500).json({ message: 'Erreur lors de recuperation des articles', error: error.message });
    }
}

const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'article', error: error.message });
    }
}

const updateArticle = async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'article', error: error.message });
    }
}

const deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        res.status(200).json({ message: 'Article supprimé avec succès', article: deletedArticle });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'article', error: error.message });
    }
}

module.exports = { getAllArticles, createArticle, getArticleById, updateArticle, deleteArticle };