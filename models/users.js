const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    
    name: String,
    lastName:String,
    id:Number,
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

const usuarios = mongoose.model('usuarios', usuariosSchema);
module.exports = usuarios;