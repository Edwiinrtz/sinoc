const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
    
    place: String,
    KindOf:String,
    doctor:String,
    date:String,
    time:String,
    
})

const appointments = mongoose.model('appointments', appointmentsSchema);
module.exports = appointments;