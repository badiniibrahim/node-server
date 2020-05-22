const password = require('passport')
const User = require('../models/User')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    const userid = payload.sub
    User.findById(userid, function(error, user){
        if(error){
            return done(error, false)
        }
        if(user){
            return done(null, user)
        }else {
            return done(null, false)
        }
    })
})

const localOptions = { usernameField : 'email'}
const localStrategy = new LocalStrategy(localOptions, function(email, password, done){
    User.findOne({email}, function(error, user){
        if(error) return done(error)
        if(!user) return done(null, false)
        user.isPasswordEqualTo(password, function(error, isMatch){
            if(error) return done(error)
            if(!isMatch) return done(null, false)
            return done(null, user)
        })
    })
})

password.use(jwtLogin)
password.use(localStrategy)