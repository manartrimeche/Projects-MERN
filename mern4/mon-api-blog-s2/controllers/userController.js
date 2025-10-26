// Tableau en mémoire pour stocker les utilisateurs (remarque : les données seront perdues au redémarrage du serveur)
const users = [];

// Fonction pour récupérer tous les utilisateurs
const getAllUsers = (req, res) => {
    // Répond avec un statut 200 (OK) et un objet JSON contenant la liste des utilisateurs
    res.status(200).json({ 
        message: "Récupération de tous les utilisateurs", 
        success: true, 
        users // Inclut le tableau des utilisateurs dans la réponse
    });
}

// Fonction pour créer un nouvel utilisateur
const createUser = (req, res) => {
    // Récupère les données de l'utilisateur depuis le corps de la requête
    const userData = req.body;
    
    // Affiche les données reçues dans la console pour le débogage
    console.log('Données reçues par le controller:', userData);
    
    // Ajoute le nouvel utilisateur au tableau avec un ID généré (timestamp actuel)
    users.push({ id: Date.now(), ...userData });
    
    // Répond avec un statut 201 (Created) et un objet JSON de confirmation
    res.status(201).json({
        message: 'Utilisateur créé avec succès via controller!',
        user: { id: Date.now(), ...userData } // Retourne l'utilisateur créé
    });
}

// Exporte les fonctions pour les rendre disponibles dans d'autres fichiers
module.exports = { getAllUsers, createUser };