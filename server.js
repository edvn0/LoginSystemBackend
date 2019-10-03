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

app.use(bodyParser.urlencoded({
    extended: false
}));
if (prod) {
    app.use(cors(origin));
} else {
    app.use(morgan('combined'));
}

const apiRoute = require('./routes/apiRoute');
const usersRoute = require('./routes/usersRoute');
app.use('/v1/api', apiRoute);
app.use('/v1/api/users', usersRoute);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})


app.listen(process.env.PORT || 42011, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
})

module.exports = app;