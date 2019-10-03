const Router = require('express').Router();
const Database = require('../database/database.js');

const dbService = new Database();

// Change this?
Router.get('/', async (req, res) => {
  const users = await dbService.getUsers();
  res.send(users);
})

module.exports = Router;