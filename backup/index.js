const express = require('express')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const cors = require('cors');

const jwt = require('jsonwebtoken');
const controller = require('./controller/controller');
require('./src/environments/environment');

//configs
const app = express()

app.use(express.json());

app.use(fileUpload({
  createParentPath: true
}))

app.use(cors())

//mongoose Configs
const url = environment.dataBaseUrl;

mongoose.connect(url,(err)=>{
  if(err) return err

  console.log("conected sucessfully to database")

})

//jwt info
const { json_key } = require('./configs/configs')
middelware_jwt = express.Router();

middelware_jwt.use((req, res, next) => {
  token = req.headers['access-token']

  if (token) {
    jwt.verify(token, json_key, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
        req.decoded = decoded;
        return res.send("permitir acceso al sistema con la info almacenada en cache")
      }
    });
  } else {
    next()
  }
})

//Routes
app.post('/login', middelware_jwt, async (req, res) => {
  //validar si existe JWT -> se usa desde el middelware
  try{
    let response = await controller.login(req.body)

    console.log("response.user" , response.user);
    if (response.exist) {
      res.json({
        Status: 200,
        payload: response.payload,
        token: response.token,
        user: response.user,
        expiresIn: 3600
      })
    } else {
      res.sendStatus(404)
    }
  }catch(err){
    console.log("An error has ocurred",err)
  }
  //res.json(response.sessionInfo)

})


app.post("/signin", async (req, res) => {
  try{
    let response = await controller.signin(req.body)
    response ? res.sendStatus(200) : res.sendStatus(404)
  }catch(err){
    console.log("se ha producido un error: "+ err)
  }
})

//Nueva cita --- --
app.post("/newquote",async (req,res)=>{
    let response = await controller.quote(req.body)
    response.done ? res.sendStatus(200) : res.status(400).send(response.message)
})

//Todas- citas : _id: por usuario se identifica por cedula
app.post("/myQuotes",async (req,res)=>{
  console.log("server /myQuotes" , req.body)
  let response = await controller.getQuotes({id:req.body.id})
  response.done ? res.status(200).json(response.info) : res.status(400).send(response.message)
})

//Crear disponibildiad del médico
app.post("/newAppointment", async (req,res)=>{
  console.log("server.js " , req.body);
  let response = await controller.appointment(req.body)
  response.done ? res.sendStatus(200) : res.status(400).send(response.message)
})

//Filtro por el status del medico de la hora.
app.get("/appointments",async (req,res)=>{
  let response = await controller.getAppointments({status:"available"})
  response.done ? res.status(200).json(response.info) : res.status(400).send(response.message)
})

//orden - todavia no funciona...
app.post("/uploadfile",(req,res)=>{
  try{
    let file = req.files.file
    if(file.mimetype.toLowerCase() == "application/pdf"){
      file.mv('./files/'+ Date.now()+"-"+req.body.id+".pdf")
      res.sendStatus(200)
    }else{
      //console.log("formato incorrecto")
      res.sendStatus(415)
    }
  }catch(err){
      //console.log(err)
      res.status(404).send("file not found")
  }

})

app.listen(3000, () => {

  console.log("Server has been started")
})
