require('../configs/configs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json_key } = require('../configs/configs')

let users = require('../models/users.json')

search = async (id) => {
    found = false
    info = {}
    await users.map((element) => {
        //console.log(element)
        if (element.id == id) {
            info = element
            found = true
        }
    })
    return { found, info }
}

login = async (data) => {
    //console.log(data)
    //autenticar id - pass
    exist = false
    user = await search(data.id)
    sessionInfo = {
        exist
    }
    matched = bcrypt.compare(data.pass,user.info.pass)
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
    /*let name     = data.name;
    let pass       = data.password
    let id         = data.id
    let email      = data.email
    let eps        = data.eps
    let birthday   = data.birthday
    let expedition = data.expedition
    let dir        = data.dir
    let contact    = data.contact*/

    

    let exist = await search(data.id)
    if (!exist.found) {
        hash = await bcrypt.hash(data.pass, 10)
        data.pass = hash;
        users.push(data)
        //console.log(users)
        return true
    } else {
        console.log("User already exist")
        return false
    }
}
module.exports = {
    login: login,
    signin: signin
}