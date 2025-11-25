# MERN TP5 - API de Gestion de Cours

API RESTful pour la gestion d'utilisateurs, de profils, de cours et de critiques avec des relations MongoDB. Cette application permet l'inscription, l'authentification JWT, la gestion de cours et les critiques.

## 🚀 Technologies Utilisées

- **Node.js** & **Express** - Backend framework
- **MongoDB** & **Mongoose** - Base de données NoSQL
- **JWT** - Authentification sécurisée
- **bcryptjs** - Hashage de mots de passe
- **dotenv** - Gestion des variables d'environnement

## 📦 Installation

```bash
# Cloner le projet
git clone <repository-url>
cd TP5

# Installer les dépendances
npm install express mongoose dotenv bcryptjs jsonwebtoken cors

# Installer nodemon (développement)
npm install -g nodemon
```

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/eduplatform
JWT_SECRET=a8f5e2c9b1d4e7f0a3b6c9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9f2
```

## 🏃 Démarrage

```bash
# Assurez-vous que MongoDB est lancé
mongod

# Mode développement avec nodemon
nodemon server.js

# Ou mode production
node server.js
```

Le serveur démarre sur `http://localhost:5000`

## 📋 API Endpoints

### 🔐 Authentication

#### POST `/api/auth/register`

Inscription d'un nouvel utilisateur.

**Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Réponse (201):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "673d5e8f9a2b1c3d4e5f6a7b"
}
```

#### POST `/api/auth/login`

Connexion d'un utilisateur existant.

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Réponse (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "673d5e8f9a2b1c3d4e5f6a7b"
}
```

---

### 👤 Gestion des Utilisateurs

#### GET `/api/users/`

Route publique de test.

**Réponse (200):**

```json
{
  "message": "Bienvenue sur la route publique"
}
```

#### GET `/api/users/profile` 🔒

Récupère le profil de l'utilisateur connecté (route protégée).

**Headers:**

```
Authorization: Bearer <token>
```

**Réponse (200):**

```json
{
  "_id": "673d5e8f9a2b1c3d4e5f6a7b",
  "username": "john_doe",
  "email": "john@example.com",
  "courses": ["courseId1", "courseId2"]
}
```

---

### 📚 Gestion des Cours

#### POST `/api/courses`

Crée un nouveau cours.

**Body:**

```json
{
  "title": "Introduction à Node.js",
  "description": "Apprenez les bases de Node.js et Express",
  "instructor": "Prof. Martin"
}
```

**Réponse (201):**

```json
{
  "_id": "673d5e8f9a2b1c3d4e5f6a7c",
  "title": "Introduction à Node.js",
  "description": "Apprenez les bases de Node.js et Express",
  "instructor": "Prof. Martin",
  "students": []
}
```

#### GET `/api/courses`

Récupère tous les cours.

**Réponse (200):**

```json
[
  {
    "_id": "673d5e8f9a2b1c3d4e5f6a7c",
    "title": "Introduction à Node.js",
    "description": "Apprenez les bases de Node.js et Express",
    "instructor": "Prof. Martin",
    "students": []
  }
]
```

#### GET `/api/courses/:id`

Récupère un cours par son ID.

#### POST `/api/courses/:courseId/enroll`

Inscrit un utilisateur à un cours (Relation Many-to-Many).

**Body:**

```json
{
  "userId": "673d5e8f9a2b1c3d4e5f6a7b"
}
```

#### GET `/api/courses/:courseId/students`

Récupère tous les étudiants inscrits à un cours.

---

### ⭐ Gestion des Critiques (Relation 1-to-Many)

#### POST `/api/courses/:courseId/reviews`

Ajoute une critique pour un cours.

**Body:**

```json
{
  "rating": 5,
  "comment": "Excellent cours, très bien expliqué!",
  "userId": "673d5e8f9a2b1c3d4e5f6a7b"
}
```

**Réponse (201):**

```json
{
  "_id": "673d5e8f9a2b1c3d4e5f6a7d",
  "rating": 5,
  "comment": "Excellent cours, très bien expliqué!",
  "user": "673d5e8f9a2b1c3d4e5f6a7b",
  "course": "673d5e8f9a2b1c3d4e5f6a7c"
}
```

#### GET `/api/courses/:courseId/reviews`

Récupère toutes les critiques d'un cours.

---

### 2. Gestion des Profils (Relation 1-to-1)

#### POST /api/users/:userId/profile

Crée un profil pour un utilisateur.

**Body:**

```json
{
  "bio": "Développeur passionné",
  "website": "https://johndoe.com"
}
```

**Réponse (201):**

```json
{
  "_id": "...",
  "user": "userId",
  "bio": "Développeur passionné",
  "website": "https://johndoe.com"
}
```

#### GET /api/users/:userId/profile

Récupère le profil d'un utilisateur.

**Réponse (200):**

```json
{
  "_id": "...",
  "user": {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "bio": "Développeur passionné",
  "website": "https://johndoe.com"
}
```

#### PUT /api/users/:userId/profile

Met à jour le profil d'un utilisateur.

**Body:**

```json
{
  "bio": "Nouvelle bio",
  "website": "https://newwebsite.com"
}
```

## 🧪 Test avec Postman

### Ordre de test recommandé :

1. **Register** → Créer un compte
2. **Login** → Récupérer le token JWT
3. **Create Course** → Créer des cours
4. **Enroll** → S'inscrire à un cours
5. **Add Review** → Ajouter une critique

### Configuration du Token

Pour les routes protégées (🔒), allez dans **Authorization** → Type: **Bearer Token** → Collez le token reçu lors du login.

Ou dans **Headers** :

- Key: `Authorization`
- Value: `Bearer <votre_token>`

### Import Collection Postman

Importez directement le fichier `MERN_TP5.postman_collection.json` dans Postman pour avoir toutes les requêtes préconfigurées !

---

## 📁 Structure du Projet

```
TP5/
├── config/
│   └── db.js                    # Configuration MongoDB
├── controllers/
│   ├── userController.js        # Logique utilisateurs
│   ├── profileController.js     # Logique profils
│   ├── courseController.js      # Logique cours
│   └── reviewController.js      # Logique critiques
├── middleware/
│   └── authMiddleware.js        # Middleware JWT
├── models/
│   ├── User.js                  # Modèle utilisateur
│   ├── Profile.js               # Modèle profil
│   ├── Course.js                # Modèle cours
│   └── Review.js                # Modèle critique
├── routes/
│   ├── authRoutes.js            # Routes authentification
│   ├── userRoutes.js            # Routes utilisateurs
│   └── courseRoutes.js          # Routes cours
├── .env                         # Variables d'environnement
├── .gitignore
├── package.json
├── server.js                    # Point d'entrée
└── README.md
```

---

## 🔗 Relations MongoDB

- **1-to-1**: User ↔ Profile (un utilisateur a un profil unique)
- **Many-to-Many**: User ↔ Course (utilisateurs inscrits à plusieurs cours)
- **1-to-Many**: Course → Reviews (un cours peut avoir plusieurs critiques)

---

## 🛡️ Sécurité

- Mots de passe hashés avec **bcryptjs**
- Authentification JWT avec expiration (24h)
- Routes protégées par middleware
- Validation des données d'entrée

---

## 📝 Notes

- MongoDB doit être lancé avant de démarrer le serveur
- Le port par défaut est `5000`
- Base de données : `eduplatform`
- Token JWT valide pendant 24 heures

---

## 👨‍💻 Auteur

Projet MERN TP5 - Gestion de cours en ligne
