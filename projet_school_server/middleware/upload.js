const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration de stockage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Vérifie si le répertoire uploads existe, sinon le crée
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); // Dossier de destination pour les fichiers téléchargés
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier
    }
});

// Filtre pour accepter uniquement les fichiers image
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limite de taille de fichier à 5MB
});

module.exports = upload;