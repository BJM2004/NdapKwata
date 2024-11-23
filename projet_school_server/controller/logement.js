const logementService = require('../services/logement');
const jwt = require('jsonwebtoken');

async function list(req, res) {
    try {
        const logements = await logementService.findAll();
        res.status(200).json(logements);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des logements", error: err });
    }
}

async function read(req, res) {
    const logementId = req.params.id;
    try {
        const logement = await logementService.find(logementId);
        if (logement) {
            res.status(200).json(logement);
        } else {
            res.status(404).json({ message: "Logement non trouvé" });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération du logement", error: err });
    }
}

async function listByBailleur(req, res) {
    const bailleurId = req.params.bailleurId;
    try {
        const logements = await logementService.findBailleurLogement(bailleurId);
        res.status(200).json(logements);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des logements du bailleur", error: err });
    }
}
async function create(req, res) {
    const data = req.body;
    const image = req.file ? req.file.filename : null;
    data.image = image;

    // Extraire l'ID du bailleur à partir du jeton JWT
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const decodedToken = jwt.verify(token, 'your-secret-key');
        if (!decodedToken.bailleurId) {
            return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas un bailleur.' });
        }

        // Ajouter l'ID du bailleur aux données du logement
        data.bailleur = decodedToken.bailleurId;

        const createdLogement = await logementService.create(data);
        if (createdLogement) {
            res.status(201).json({ message: "Logement créé", logement: createdLogement });
        } else {
            res.status(400).json({ message: 'Erreur lors de l\'insertion' });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la création du logement", error: err });
    }
}

async function update(req, res) {
    const logementId = req.params.id;
    try {
        const data = req.body;
        const updatedLogement = await logementService.update(logementId, data);
        if (updatedLogement) {
            res.status(200).json({ message: "Logement édité", logement: updatedLogement });
        } else {
            res.status(400).json({ message: "Erreur lors de l'édition" });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'édition du logement", error: err });
    }
}

async function remove(req, res) {
    const logementId = req.params.id;
    try {
        const removedLogement = await logementService.remove(logementId);
        if (removedLogement) {
            res.status(200).json({ message: "Logement supprimé" });
        } else {
            res.status(400).json({ message: "Erreur lors de la suppression" });
        }
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression du logement", error: err });
    }
}

module.exports = {
    list, read, create, update, remove, listByBailleur
};
