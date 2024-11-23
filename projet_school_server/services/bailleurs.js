const Bailleur = require('../models/bailleur');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function findAll() {
    return await Bailleur.find();
}

async function find(bailleurId) {
    return await Bailleur.findById(bailleurId).populate('User');
}

async function create(data) {
    try {
        // Vérifier si le bailleur existe déjà en utilisant l'email
        const existingBailleur = await Bailleur.findOne({ email: data.email });
        if (existingBailleur) {
            return { message: 'Bailleur déjà existant' };
        }

        const bailleur = new Bailleur(data);
        // Le mot de passe sera crypté automatiquement grâce au hook pre('save')
        await bailleur.save();
        return bailleur;
    } catch (error) {
        return { message: 'Erreur lors de la création du bailleur', error };
    }
}
async function login(email, password) {
    try {
      console.log('Tentative de connexion pour:', email); // Debug
      const bailleur = await Bailleur.findOne({ email });
      if (!bailleur) {
        console.log('Bailleur non trouvé'); // Debug
        return { message: 'Bailleur non trouvé' };
      }
  
      const isMatch = await bcrypt.compare(password, bailleur.password);
      if (!isMatch) {
        console.log('Mot de passe incorrect'); // Debug
        return { message: 'Mot de passe incorrect' };
      }
  
      // Générer un token JWT
      const token = jwt.sign({ bailleurId: bailleur._id, role: 'bailleur' }, 'your-secret-key', { expiresIn: '1h' });
  
      return { bailleur, token };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error); // Debug
      return { message: 'Erreur lors de la connexion', error };
    }
  }async function update(bailleurId, data) {
    return await Bailleur.findByIdAndUpdate(bailleurId, data, { new: true });
}

async function remove(bailleurId) {
    return await Bailleur.findByIdAndRemove(bailleurId);
}

module.exports = {
    findAll,
    find,
    create,
    update,
    login,
    remove
};