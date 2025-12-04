// Chargement des variables d'environnement depuis le fichier .env
require('dotenv').config();

// Importation du module Express
const express = require('express');
const cors = require('cors');

// Création d'une instance d'application Express
const app = express();

// Importation de la fonction de connexion à la base de données
const connectDB = require('./config/db');

// Connexion à la base de données dès le démarrage du serveur
connectDB();

// Définition du port d'écoute du serveur (via .env, défaut 5000 pour éviter les conflits)
const PORT = process.env.PORT || 5000;


// Importation des fichiers de routes
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');

// CORS: autoriser les appels depuis le front (projets séparés)
// Définissez CORS_ORIGINS dans .env, ex: http://localhost:5173,http://localhost:3000
const allowedOrigins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins.length ? allowedOrigins : true, // true = autorise tout si non défini
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Express 5 n'accepte pas '*' en chemin. L'usage de app.use(cors()) ci-dessus
// gère déjà les requêtes OPTIONS (préflight) sur toutes les routes.

// Middleware permettant de parser le corps des requêtes au format JSON
app.use(express.json());


// --- ROUTE PRINCIPALE ---
// Route GET de base (page d’accueil de l’API)
// Accessible via http://localhost:3000/
app.get('/', (req, res) => {
    res.status(200).send('<h1>Page d\'accueil de notre API de Blog !</h1>');
});


// --- ROUTES API ---
// Toutes les routes commençant par /api/articles seront gérées par articleRoutes
app.use('/api/articles', articleRoutes);

// Toutes les routes commençant par /api/users seront gérées par userRoutes
app.use('/api/users', userRoutes);


// --- LANCEMENT DU SERVEUR ---
// Démarrage de l’application Express sur le port défini
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
