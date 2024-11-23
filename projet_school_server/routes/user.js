// projet_school_server/routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const  authMiddleware  = require("../middleware/authMiddleware");

// Afficher tous les utilisateurs
router.get('/', authMiddleware.authenticateToken, userController.list);

// Afficher un utilisateur en particulier
router.get("/:id", authMiddleware.authenticateToken, userController.read);

// Se déconnecter
router.post('/logout', userController.logout);

// Créer un utilisateur (login)
router.post("/register", userController.create);
// Connexion d'un utilisateur
router.post("/login", userController.login);

// Modifier un utilisateur
router.put("/:id", authMiddleware.authenticateToken, userController.update);

// Supprimer un utilisateur
router.delete("/:id", authMiddleware.authenticateToken, userController.remove);

module.exports = router;