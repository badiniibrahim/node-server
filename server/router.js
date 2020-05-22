const AuthentificationController = require('./controllers/authentification')
const password = require('passport')
require("./services/password")

const requireToken = password.authenticate('jwt', {session: false})
const requireValidecredentials = password.authenticate('local', {session: false})

module.exports = function(expressServer){
   expressServer.post('/signup', AuthentificationController.Signup)
   expressServer.post('/signin', requireValidecredentials, AuthentificationController.Signin)

}