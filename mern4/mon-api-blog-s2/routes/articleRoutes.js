const express=require('express');
const router=express.Router();
const {getAllArticles,createArticle}=require('../controllers/articleController');
router.get('/',getAllArticles);
// Route POST pour /api/articles (devient / dans ce routeur)
router.post('/',createArticle);
// On exporte le routeur pour l’utiliser dans server.js
module.exports=router;