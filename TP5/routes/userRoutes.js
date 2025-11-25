const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

// Route publique
router.get("/", async (req, res) => {
  // Accessible sans authentification
  res.json({ message: "Bienvenue sur la route publique" });
});

// Route protégée
router.get("/profile", protect, async (req, res) => {
  // req.userId contient l’ID de l’utilisateur connecté
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

module.exports = router;
