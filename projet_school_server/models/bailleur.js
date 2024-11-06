const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const bailleurSchema = new Schema({
  name: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profile: { type: String },
  password: { type: String, required: true },
});

// Hacher le mot de passe avant de sauvegarder le bailleur
bailleurSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Bailleur = model('Bailleur', bailleurSchema);

module.exports = Bailleur;
