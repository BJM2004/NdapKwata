// projet_school_server/routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { authenticateToken } = require("../middleware/authMiddleware");

// Afficher tous les utilisateurs
router.get('/', authenticateToken, userController.list);

// Afficher un utilisateur en particulier
router.get("/:id", authenticateToken, userController.read);

// Se déconnecter
router.post('/logout', userController.logout);

// Créer un utilisateur (login)
router.post("/login", userController.create);

// Modifier un utilisateur
router.put("/:id", authenticateToken, userController.update);

// Supprimer un utilisateur
router.delete("/:id", authenticateToken, userController.remove);

module.exports = router;