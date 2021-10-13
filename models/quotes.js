const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AgCitasSchema = new Schema({
    
    name: String,
    lastNames: String,
    id: Number,
    email: String,
    landline: Number,
    place: String,
    type_of_query: String,
    requested_doctor: String,
    available_date: String,
    available_time: String
    
})

const AgCitas = mongoose.model('AgCitas', AgCitasSchema);
module.exports = AgCitas;