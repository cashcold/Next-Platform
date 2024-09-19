const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    user_Name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    
    email: {
        type: String,
        require: true,
    },
    accountBalance: {
        type: Number,
    },
    referrer:{
        type: String
    },
    country:{
        type: String
    },
    restartLinkPassword:{
        type: String,
    },
    Date:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;