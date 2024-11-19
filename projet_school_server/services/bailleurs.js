const Bailleur = require('../models/bailleur');
const bcrypt = require('bcrypt');

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

async function update(bailleurId, data) {
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
    remove
};