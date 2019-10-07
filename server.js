(function () {
    const express = require('express');
    const morgan = require('morgan');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const path = require('path');
    const faker = require('faker');
    require('dotenv').config();

    const prod = process.env.NODE_ENV === "production";
    const origin = {
        origin: prod ? "https://login-app-angular.herokuapp.com/" : "*"
    };

    const app = express();

    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json())
    app.use(cors(origin));

    if (!prod) {
        app.use(morgan('combined'));
    }

    const apiRoute = require('./routes/apiRoute');
    const usersRoute = require('./routes/usersRoute');
    app.use('/v1/api', apiRoute);
    app.use('/v1/api/users', usersRoute);
    app.use(express.static(path.join(__dirname, "static")));


    app.listen(process.env.PORT, () => {
        console.log(`Listening to port: ${process.env.PORT}`);
    })

    module.exports = app;
})();