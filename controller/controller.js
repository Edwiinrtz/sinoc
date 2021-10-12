require('../configs/configs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//importing models
const usuarios = require('../models/users')
const appointmentModel = require('../models/appointment')

const { json_key } = require('../configs/configs')

search = async (userId) => {
    let found = false;
    info = {}
    /*await users.map((element) => {
        //console.log(element)
        if (element.id == id) {
            info = element
            found = true
        }
    })*/
    user = await usuarios.findOne({ 'id': userId }).exec()

    if(user){
        info = user
        found = true
    }
    return {found, info}
    
}

login = async (data) => {
    //console.log(data)
    //autenticar id - pass
    exist = false
    user = await search(data.id)
    sessionInfo = {
        exist
    }
    if(!user.info.password){
        user.info.password = ""
    }
    matched = await bcrypt.compare(data.password, user.info.password)
    
    
    if (user.found && matched) {
        //console.log(user)
        exist = true
        //crear info para jwt
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, json_key, {
            expiresIn: 1440
        });

        sessionInfo = {
            user,
            exist,
            payload,
            token
        }
    }
    //enviar info jwt y sesión
    return sessionInfo
}


signin = async (data) => {
    let exist = await search(data.id)
    //console.log(exist)
    if (!exist.found) {
        hash = await bcrypt.hash(data.password, 10)
        data.password = hash;
        user = new usuarios(data)
        user.save()
        //console.log(users)
        return true
    } else {
        console.log("User already exist")
        return false
    }
}

appointment = (data)=>{
    try{
        if(Object.keys(data).length!=5){
            throw new Error("some information is missing or you're sending more than needed information")
        }else{
            let newAppointment = new appointmentModel(data);
            newAppointment.save()
            return {"done":true}    
        }
    }catch(err){
        return {"done:":false,"message":"an error has ocurred while an appointment was being booked\n"+err}
        
    }
}
getAppointments = async () =>{
    let appointments = await appointmentModel.find({}).exec()
    
    if(!appointments) return {"done":false,"message":"There are not booked appointments"}
    
    return {"done":true,"info":appointments}
    
}
module.exports = {
    login: login,
    signin: signin,
    appointment: appointment,
    getAppointments:getAppointments
}