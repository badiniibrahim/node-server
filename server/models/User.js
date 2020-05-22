const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    password: String
})

userSchema.pre("save", function(next){
    const user = this
    bcrypt.genSalt(10, function(error, salt){
        if(error){
            return next(error)
        }
        bcrypt.hash(user.password, salt, null,function(error, hash){
            if(error){
                return next(error)
            }
            user.password = hash
            next()
        })
    })
})
userSchema.methods.isPasswordEqualTo = function(externalPassword, done){
    bcrypt.compare(externalPassword, this.password, function(error, isMatch){
        if(error){
            return done(error)
        }
        done(null, isMatch)
    })
}
const UserModel = mongoose.model('user', userSchema)
module.exports = UserModel