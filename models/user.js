const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const {Message} = require('./message');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024
    },
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'), {
        expiresIn: 604800 // 1 week
    });
    return token;
}

const User = mongoose.model('User', userSchema);

function getUserById(id, callback) {
    User.findById(id, callback);
}

// function getUserByUsername(username, callback) {
//     const query = {username: username};
//     User.findOne(query, callback);
// }

function validateUserRegister(user) {
    const schema = {
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/).required()
    };
    return Joi.validate(user, schema);
}

function validateUserLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.getUserById = getUserById;
// exports.getUserByUsername = getUserByUsername;
exports.validateRegister = validateUserRegister;
exports.validateLogin = validateUserLogin;