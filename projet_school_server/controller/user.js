const userService = require('../services/user');
const jwt = require('jsonwebtoken');

async function list(req, res) {
    try {
        const users = await userService.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error: err });
    }
}

async function read(req, res) {
    const userId = req.params.id;
    try {
        const user = await userService.find(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error: err });
    }
}

async function create(req, res) {
    const data = req.body;
    try {
      const { user, token } = await userService.create(data);
      if (user && token) {
        res.status(201).json({ message: "Utilisateur créé", token });
      } else {
        res.status(400).json({ message: 'Erreur lors de l\'insertion' });
      }
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: err });
    }
  }
  
async function update(req, res) {
    const userId = req.params.id;
    try {
        const data = req.body;
        const updatedUser = await userService.update(userId, data);
        if (updatedUser) {
            res.status(200).json({ message: "Utilisateur édité" });
        } else {
            res.status(400).json({ message: "Erreur lors de l'édition" });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'édition de l'utilisateur", error: err });
    }
}

async function remove(req, res) {
    const userId = req.params.id;
    try {
        const removedUser = await userService.remove(userId);
        if (removedUser) {
            res.status(200).json({ message: "Utilisateur supprimé" });
        } else {
            res.status(400).json({ message: "Erreur lors de la suppression" });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error: err });
    }
}

function logout(req, res) {
    // Si vous utilisez JWT, la déconnexion peut être gérée en invalidant le token côté client
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
        }
        res.status(200).json({ message: 'Utilisateur déconnecté' });
      });}

module.exports = {
    list,
    read,
    create,
    update,
    remove,
    logout
};
