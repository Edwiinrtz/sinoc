require('../configs/configs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//importing models
const usuarios = require('../models/users')
const appointmentModel = require('../models/Appointments')
const quoteModel = require('../models/quotes')

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
quote = async(data)=>{
    console.log("valores de data quote:::::::::" , data);
    try{
        if(Object.keys(data).length!=10){
            throw new Error("some information is missing or you're sending more than needed information")
        }else{
            filter = {
                place:data.place,
                KindOf:data.type_of_query,
                doctor:data.requested_doctor,
                date:data.available_date,
                time:data.available_time,
                status:"available"
            }
            info_appointment = await getAppointments(filter)

            if(info_appointment.done){
                console.log("entró")
                appointmentModel.updateOne(filter,{status:"closed"}).exec()
                let newQuote = new quoteModel(data);
                newQuote.save()
                return {"done":true}
            }else{

                return {"done":false,"message":"there are not appointments available"}
            }

        }
    }catch(err){
        return {"done:":false,"message":"an error has ocurred while an appointment was being booked\n"+err}

    }
}
getQuotes = async (filters) =>{
    let quotes = await quoteModel.find(filters).exec()

    if(quotes.length < 1 ) return {"done":false,"message":"There are not quotes"}

    return {"done":true,"info":quotes}

}

appointment = async(data)=>{
    console.log("data controlador:" , data)
    try{
        filter = {
            place:data.place,
            KindOf:data.KindOf,
            doctor:data.doctor,
            date:data.date,
            time:data.time
        }
        info_appointment = await getAppointments(filter)
        if( info_appointment.done   || Object.keys(data).length!=6){
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
getAppointments = async (filters) =>{
    let appointments = await appointmentModel.find(filters).exec()

    if(appointments.length < 1 ) return {"done":false,"message":"There are not booked appointments"}

    return {"done":true,"info":appointments}

}
module.exports = {
    login: login,
    signin: signin,
    quote: quote,
    getQuotes:getQuotes,
    appointment:appointment,
    getAppointments:getAppointments
}
