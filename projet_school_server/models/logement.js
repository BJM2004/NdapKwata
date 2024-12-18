const mongoose = require('mongoose');

const logementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  bailleur: { type: mongoose.Schema.Types.ObjectId, ref: 'Bailleur', required: true },
});

const Logement = mongoose.model('Logement', logementSchema);
module.exports=Logement;
