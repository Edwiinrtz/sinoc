const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const appoinmentSchema = new Schema({
    
    place: String,
    kindOf:String,
    doctor:String,
    date:String,
    time:String,
})

const appointment = mongoose.model('appointment', appoinmentSchema);
module.exports = appointment;