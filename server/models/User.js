const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    image: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    googleId: {
        type: String,
        sparse: true
    },
    token: {
        type: String
    },
    taks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);
module.exports = User;
