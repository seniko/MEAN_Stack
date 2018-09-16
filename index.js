const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/users');
const messages = require('./routes/messages');


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/contact', messages);

require('./startup/db')();
require('./middleware/passport')(passport);

app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
