const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SoMedicamentosSchema = new Schema({
    
    name: String,
    lastNames:String,
    id:Number,
    address:String,
    email:String,
    landline:Number,
    file:String,
    observations:String,
    
})

const SoMedicamentos = mongoose.model('SoMedicamentos', SoMedicamentosSchema);
module.exports = SoMedicamentos;