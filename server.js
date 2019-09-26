const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

const apiRoute = require('./routes/apiRoute');
app.use('/v1/', apiRoute);

module.exports = {
    nodeApp: app
};