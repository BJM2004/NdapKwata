const express = require('express');
const Logement = require('../models/logement');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route pour récupérer tous les logements
router.get('/', async (req, res, next) => {
  try {
    const logements = await Logement.find();
    res.json(logements);
  } catch (error) {
    next(error); // Passe l'erreur au middleware de gestion des erreurs
  }
});

// Route pour récupérer un logement par ID
router.get('/:id', async (req, res, next) => {
  try {
    const logement = await Logement.findById(req.params.id).populate('bailleur');
    if (!logement) {
      return res.status(404).json({ error: 'Logement not found' });
    }
    res.json(logement);
  } catch (error) {
    next(error); // Passe l'erreur au middleware de gestion des erreurs
  }
});

// Route pour créer un nouveau logement (protégée par le middleware d'authentification)
router.post('/', authMiddleware, async (req, res, next) => {
  const { title, description, price, image } = req.body;
  const bailleurId = req.user.id; // Extrait l'ID du bailleur du token

  const newLogement = new Logement({ title, description, price, image, bailleur: bailleurId });

  try {
    const savedLogement = await newLogement.save();
    res.json(savedLogement);
  } catch (error) {
    next(error); // Passe l'erreur au middleware de gestion des erreurs
  }
});

module.exports = router;
