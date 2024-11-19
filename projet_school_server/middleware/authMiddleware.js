const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token d\'autorisation manquant' });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = user;
        next();
    });
}

// projet_school_server/middleware/authMiddleware.js

function authorizeBailleur(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        console.log("Token décodé dans authorizeBailleur:", decoded);

        // Vérifier uniquement la présence de bailleurId
        if (!decoded.bailleurId) {
            console.log("BailleurId manquant dans le token");
            return res.status(403).json({ message: 'Accès refusé. ID bailleur manquant.' });
        }

        // Stocker l'ID du bailleur dans req pour utilisation ultérieure
        req.user = decoded;
        req.bailleurId = decoded.bailleurId;
        console.log("Autorisation accordée pour le bailleur:", decoded.bailleurId);
        next();
    } catch (error) {
        console.error("Erreur de vérification du token:", error);
        return res.status(401).json({ message: 'Token invalide' });
    }
}

module.exports = { authenticateToken, authorizeBailleur };