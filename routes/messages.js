const express = require('express');
const router = express.Router();
const {Message, validateMessage} = require('../models/message');
const {User} = require('../models/user');
const admin = require('../middleware/admin');
const passport = require('passport');
//const util = require('util');

router.post('/messages', async (req, res) => {
    const {error} = validateMessage(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});


    let message = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    
    if (user) {
        await message.save();
                
        await user.message.push(message._id);
        await user.save();
        await User.find().populate('message');
        //console.log(util.inspect(users, false, null, true));
        
        res.status(200).json({success: true, msg: "Message sent."});
    } else {
        await message.save();
        res.status(200).json({success: true, msg: "Message sent."});
    }
});


router.get('/messages', passport.authenticate('jwt', {session: false}), [admin], async (req, res) => {
    const messages = await Message.find().sort('-date');
    res.send(messages);
});


router.delete('/messages/:id', passport.authenticate('jwt', {session: false}), [admin], async (req, res) => {
    let message = await Message.findById(req.params.id);


    let user = await User.findOne({email: message.email});
    if (user) {
        await User.update(
            { email: message.email }, 
            { $pull: { message: req.params.id }});
    }
    
    message = await Message.findByIdAndRemove(req.params.id);
    if (!message) return res.status(404).json({success: false, msg: "Message not found."});
    res.status(200).json({success: true, msg: "Message removed."})
});


module.exports = router;