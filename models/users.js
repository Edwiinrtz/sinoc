const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const usuariosSchema = new mongoose.Schema({
    
    name: String,
    lastNames:String,
    id:Number, required: true, unique: true,
    issueDate:String,
    birthDate:String,
    eps:String,
    address:String,
    email:String,
    landline:Number,
    phoneNumber:Number,
    rol:String,
    password:String
    
})
usuariosSchema.plugin(uniqueValidator);
const usuarios = mongoose.model('usuarios', usuariosSchema);
module.exports = usuarios;