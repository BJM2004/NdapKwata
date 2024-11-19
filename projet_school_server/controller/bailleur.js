const bailleurService = require('../services/bailleurs');
const jwt = require('jsonwebtoken');

async function list(req, res) {
  try {
    const bailleurs = await bailleurService.findAll();
    res.status(200).json(bailleurs);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des bailleurs", error: err });
  }
}

async function read(req, res) {
  const bailleurId = req.params.id;
  try {
    const bailleur = await bailleurService.find(bailleurId);
    if (bailleur) {
      res.status(200).json(bailleur);
    } else {
      res.status(404).json({ message: "Bailleur non trouvé" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération du bailleur", error: err });
  }
}

async function create(req, res) {
    const data = req.body;
    const profile = req.file ? req.file.path : null; // Récupérer le chemin du fichier téléchargé
    data.profile = profile;

    // Extraire l'ID de l'utilisateur à partir du token JWT
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const decodedToken = jwt.verify(token, 'your-secret-key');
        data.user = decodedToken.userId;

        const createdBailleur = await bailleurService.create(data);
        if (createdBailleur) {
            // Générer un nouveau token JWT pour le bailleur
            const newToken = jwt.sign({ bailleurId: createdBailleur._id,role:'bailleur' }, 'your-secret-key', { expiresIn: '1h' });
            res.status(201).json({ message: "Bailleur créé", token: newToken });
        } else {
            res.status(400).json({ message: 'Erreur lors de l\'insertion' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la création du bailleur", error: err });
    }
}

async function update(req, res) {
  const bailleurId = req.params.id;
  try {
    const data = req.body;
    const updatedBailleur = await bailleurService.update(bailleurId, data);
    if (updatedBailleur) {
      res.status(200).json({ message: "Bailleur édité" });
    } else {
      res.status(400).json({ message: "Erreur lors de l'édition" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'édition du bailleur", error: err });
  }
}

async function remove(req, res) {
  const bailleurId = req.params.id;
  try {
    const removedBailleur = await bailleurService.remove(bailleurId);
    if (removedBailleur) {
      res.status(200).json({ message: "Bailleur supprimé" });
    } else {
      res.status(400).json({ message: "Erreur lors de la suppression" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du bailleur", error: err });
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
    res.status(200).json({ message: 'Bailleur déconnecté' });
  });
}

module.exports = {
  list,
  read,
  create,
  update,
  remove,
  logout
};