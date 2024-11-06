const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Bailleur = require("../models/bailleur");

const router = express.Router();

// Configuration de multer pour gérer les fichiers de profil
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route pour la connexion d'un bailleur
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Vérifier que les champs email et password sont fournis
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Vérifier si le bailleur existe
    const bailleur = await Bailleur.findOne({ email });
    if (!bailleur) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, bailleur.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Générer un jeton JWT
    const token = jwt.sign({ id: bailleur._id, name: bailleur.name }, "your_jwt_secret", {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route pour l'inscription d'un bailleur
router.post("/register", upload.single('profile'), async (req, res) => {
  const { name, adresse, telephone, email, password } = req.body;
  const profile = req.file ? req.file.buffer.toString('base64') : null; // Convertir le fichier en base64

  // Vérifier que tous les champs nécessaires sont fournis
  if (!name || !adresse || !telephone || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Vérifier si le bailleur existe déjà
    const existingBailleur = await Bailleur.findOne({ email });
    if (existingBailleur) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouveau bailleur
    const newBailleur = new Bailleur({
      name,
      adresse,
      telephone,
      email,
      profile,
      password: hashedPassword,
    });
    await newBailleur.save();

    // Générer un jeton JWT
    const token = jwt.sign({ id: newBailleur._id, name: newBailleur.name }, "your_jwt_secret", {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
