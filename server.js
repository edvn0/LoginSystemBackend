const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const prod = process.env.NODE_ENV === "production";
const origin = {
    origin: prod ? "https://login-app-angular.herokuapp.com/" : "*"
};

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
    extended: false
}));
if (prod) {
    app.use(cors(origin));
}

const apiRoute = require('./routes/apiRoute');
const usersRoute = require('./routes/usersRoute');
app.use('/v1/api', apiRoute);
app.use('/v1/api/users', usersRoute);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

const port = process.env.PORT || 4201;
app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }
});

module.exports = app;