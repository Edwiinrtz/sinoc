let users = require('../models/users.json')

search = async (id) => {
    found = false
    info = {}
    await users.map((element) => {
        //console.log(element)
        if(element.id == id){
            info = element
            found = true
        }
    })
    return {found,info}
}

login = async (data) => {
    //console.log(data)
    //autenticar id - pass
    exist = false
    user = await search(data.id)
    
    if(user.found==true && user.info.pass == data.pass){
        //console.log(user)
        exist = true
        //crear info para jwt
        //enviar info jwt
    }
    return exist
    
}


signin = async (data) =>{
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
    if(!exist.found){
        users.push(data)
        console.log(users)
        return true
    }else{
        console.log("User already exist")
        return false
    }
}
module.exports = {
    login: login,
    signin: signin
}