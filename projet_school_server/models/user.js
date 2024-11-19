const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Ajoutez cette ligne pour importer bcrypt

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err); // Gérer les erreurs potentielles
    }
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
