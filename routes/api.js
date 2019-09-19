const Router = require('express').Router();
const db = require('../database/database.js');

const dbService = new db();

Router.get('/', async (req, res) => {
    res.send(await dbService.getUsers());
})

module.exports = Router;