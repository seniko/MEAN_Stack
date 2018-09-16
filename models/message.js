const mongoose = require('mongoose');
const Joi = require('joi');

const messageSchema = new mongoose.Schema({
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
        maxlength: 255
    },
    message: {
        type: String,
        required: true,
        minlength: 30,
        maxlength: 3000
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

function validateMessage(message) {
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(3).max(255).email().required(),
        message: Joi.string().min(30).max(3000).required()
    }
    return Joi.validate(message, schema);
}


exports.Message = Message;
exports.validateMessage = validateMessage;