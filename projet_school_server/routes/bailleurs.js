const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const bailleurController = require('../controller/bailleur');

// Afficher tous les bailleurs
router.get('/', bailleurController.list);

// Afficher un bailleur en particulier
router.get("/:id", bailleurController.read);

// Créer un bailleur
router.post("/register", upload.single('profile'), bailleurController.create);
// Modifier un bailleur
router.put("/:id", bailleurController.update);

// Supprimer un bailleur
router.delete("/:id", bailleurController.remove);

// Déconnecter un bailleur
router.post('/logout', bailleurController.logout);

module.exports = router;
