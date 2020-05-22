const express = require('express')
const bodyParser = require('body-parser')
const mogan = require('morgan')
const expressServer = express()
const http = require('http')
const router = require('./router')
const mongoose = require('mongoose')

mongoose.connect('', 
{useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection
.once('open', () => console.log("Connexion mongoDB"))
.on('error', error => console.log('Error', error))

expressServer.use(mogan('combined'))
expressServer.use(bodyParser.json({type: '*/*'}))

const port = 3090
const server = http.createServer(expressServer)
router(expressServer)
server.listen(port)
console.log('le server ecouter sur le port', port)