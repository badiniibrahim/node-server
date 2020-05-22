const User = require('../models/User')
const lodash = require('lodash')
const jwt = require('jwt-simple')
const config = require('../config')

function getTokenForUser(user){
    const timeStamp = new Date().getTime()
    return jwt.encode({
        sub: user.id,
        iat: timeStamp
    }, config.secret)
}

exports.Signup = function(req, res, next){
    const email = req.body.email
    const password = req.body.password

    User.findOne({email:email}, function(error, existingUser){
        if(error){
            return next(error)
        }

        if(existingUser){
            return res.status(422).send({error: "Email déjà utilisé"})
        }

        if(lodash.isEmpty(email) || lodash.isEmpty(password)){
            return res.status(422).send({error: "Email ou mot de passe vide"})
        }else {
            const user = new User({
                email: email,
                password: password
            })

            user.save(function(error){
                if(error){
                    next(error)
                }
                res.json({token : getTokenForUser(user)})
            })
        }

    })
}


exports.Signin = function(req, res, next){
    res.json({token : getTokenForUser(req.user)})
}