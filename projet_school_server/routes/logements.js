const express = require('express');
const logementController = require('../controller/logement');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Afficher tous les logements
router.get('/', logementController.list);

// Afficher un logement en particulier
router.get('/:id', logementController.read);

// Créer un logement
router.post('/add',  authMiddleware.authorizeBailleur, upload.single('image'), logementController.create);

// Modifier un logement
router.put('/:id', logementController.update);

// Supprimer un logement
router.delete('/:id', logementController.remove);

// Afficher les logements d'un bailleur
router.get('/:bailleurId/logements', logementController.listByBailleur);

module.exports = router;
