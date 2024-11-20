const Logement = require('../models/logement');
async function findAll(){
    return await Logement.find();
}
async function find(LogementId){
    return await Logement.findById(LogementId).populate('bailleur');
}
async function findBailleurLogement(BailleurId){
    return await Logement.find({Bailleur:BailleurId});
}
async function create(data){
    const logement=new Logement(data);
    return await logement.save();
}
async function update(LogementId,data){
    return await Logement.findByIdAndUpdate(LogementId,data,{new:true}).populate('Bailleur');
}
async function remove(LogementId){
    return await Logement.findByIdAndRemove(LogementId);
}
module.exports={
    findAll,find,create,update,remove,findBailleurLogement};