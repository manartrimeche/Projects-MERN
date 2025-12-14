const express = require('express');
const router = express.Router();
const { getAllArticles, createArticle, getArticleById, updateArticle, deleteArticle } = require('../controllers/articleController');

// Routes pour les articles
router.get('/', getAllArticles);
router.post('/', createArticle);
router.get('/:id', getArticleById);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;