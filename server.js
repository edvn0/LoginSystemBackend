<<<<<<< HEAD
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

const apiRoute = require('./routes/api.js');
app.use('/v1/api', apiRoute);

module.exports = app;
=======
import express from 'express';
const morgan = require('morgan');
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
// Middleware
const port = process.env.PORT || 4201;
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

// Declare routes
import api from './routes/api';
app.use('/api', api);



// Listen app and start
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
>>>>>>> 3cf9834cf456c6020bcf43d6943cb4037725bc96
