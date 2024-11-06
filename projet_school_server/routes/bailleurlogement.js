const express = require('express');
const Logement = require('../models/logement');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route pour récupérer tous les logements d'un bailleur
router.get('/bailleur/:bailleurId', authMiddleware, async (req, res, next) => {
  try {
    const logements = await Logement.find({ bailleur: req.params.bailleurId });
    res.json(logements);
  } catch (error) {
    next(error); // Passe l'erreur au middleware de gestion des erreurs
  }
});

module.exports = router;
