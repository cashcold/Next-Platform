const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_Name: {
        type: String,
        require: true,
    },
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
    ip_address:{
        type: String,
        require: true
    },
    accountBalance: {
        type: Number,
    },
    reffer:{
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