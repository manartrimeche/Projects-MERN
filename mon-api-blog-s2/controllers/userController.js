const User = require('../models/User');

// Fonction pour récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ 
            message: "Récupération de tous les utilisateurs", 
            success: true, 
            users
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
    }
}

// Fonction pour créer un nouvel utilisateur
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        console.log('Données reçues par le controller:', req.body);
        
        const newUser = new User({
            username,
            email,
            password
        });
        
        const savedUser = await newUser.save();
        
        res.status(201).json({
            message: 'Utilisateur créé avec succès!',
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Erreur lors de la création de l\'utilisateur', 
            error: error.message 
        });
    }
}

// Fonction pour récupérer un utilisateur par ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: error.message });
    }
}

module.exports = { getAllUsers, createUser, getUserById };