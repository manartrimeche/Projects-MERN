// Fonction de test pour vérifier que l'API fonctionne correctement
const testApi = (req, res) => {
    // Répond avec un statut 200 (OK) et un objet JSON
    res.status(200).json({ 
        message: 'Le test a fonctionné !', 
        success: true  
    });
}

// Fonction pour créer un nouvel article
const createArticle = (req, res) => {
    // Récupère les données de l'article depuis le corps de la requête
    const articleData = req.body;
    
    // Affiche les données reçues dans la console pour le débogage
    console.log('Données reçues :', articleData);
    
    // Répond avec un statut 201 (Created) et un objet JSON contenant le message et l'article créé
    res.status(201).json({
        message: 'Article créé avec succès !',
        // Crée un nouvel objet article avec un ID généré (timestamp actuel) et les données reçues
        article: { id: Date.now(), ...articleData }
    });
}

// Exporte les fonctions pour les rendre disponibles dans d'autres fichiers
module.exports = { testApi, createArticle };