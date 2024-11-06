const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

// Route de connexion
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log({ BODY: req.body });

  try {
    // Vérifier si l'utilisateur existe
    let user = await User.findOne({ username });

    if (!user) {
      // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        username,
        password: hashedPassword,
        email: req.body.email,
      });

      await user.save();
    } else {
      // Si l'utilisateur existe, vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    }

    // Enregistrer l'utilisateur dans la session (ou générer un token JWT)
    req.session.user = user;
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    next(error); // Passe l'erreur au middleware de gestion des erreurs
  }
});

module.exports = router;
