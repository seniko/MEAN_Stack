const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/register', async (req, res) => {
    const {error} = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).json({success: false, msg: 'User already registered.'});

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.status(200).send({success: true, msg: 'User registered.'});
});

router.post('/authenticate', async (req, res) => {
    const {error} = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({success: false, msg: 'Invalid email or password.'});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({success: false, msg: 'Invalid email or password.'});

    const token = user.generateAuthToken();
    res.status(200).json({
        success: true,
        token: "bearer " + token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;