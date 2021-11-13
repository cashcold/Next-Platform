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
    
    email: {
        type: String,
        require: true,
    },
    bitcoin: {
        type: String,
    },
    bitcoinCash: {
        type: String,
    },
    ethereum: {
        type: String,
    },
    ip_address:{
        type: String,
        require: true
    },
    accountBalance: {
        type: String,
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