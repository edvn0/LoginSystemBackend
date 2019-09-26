const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
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
    app.use(morgan('combined'));
    app.use(cors(origin));
}

const apiRoute = require('./routes/apiRoute');
app.use('/v1/', apiRoute);

const port = process.env.PORT || 4201;
app.listen(port, () => {
    console.log(`Listening on ${port}!`);
});

module.exports = app;