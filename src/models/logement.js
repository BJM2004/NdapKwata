const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const logementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  bailleurId: { type: Schema.Types.ObjectId, ref: 'Bailleur', required: true },
});

const Logement = model('Logement', logementSchema);

module.exports = Logement;
