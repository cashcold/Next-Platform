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
        default: 0,  // Ensure it starts at 0
    },
    referrer: {
        type: String,
    },
    country: {
        type: String,
    },
    restartLinkPassword: {
        type: String,
    },
    totalTimeSpent: {
        type: Number,
        default: 0,  // Track total time spent in seconds
    },
    sessionStart: {
        type: Date,  // Store the time when the session starts
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
