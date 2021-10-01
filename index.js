const express = require('express')
const app = express()
const controller = require('./controller/controller')
 
app.use(express.json());

app.post('/login', async (req, res) => {
  //validar si existe JWT
  let response =  await controller.login(req.body)
  response ? res.sendStatus(200) : res.sendStatus(404)
})


app.post("/signin",async (req, res) =>{
  let response =  await controller.signin(req.body)
  response ? res.sendStatus(200) : res.sendStatus(404)
})

app.listen(3000,()=>{

    console.log("Server has been started")
})