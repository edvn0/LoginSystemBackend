<<<<<<< HEAD
const Router = require('express').Router();
const db = require('../database/database.js');

const dbService = new db();

Router.get('/', async (req, res) => {
    res.send(await dbService.getUsers());
})

module.exports = Router;
=======
/*
    Express router to handle all api calls for 
    db insertion, get all users etc.

    All routes here will be /api/{function}
*/
import Database from '../database/database'
import express from 'express';
import User from '../database/models/User';
const Router = express.Router();

const db = new Database();

Router.get('/users', async (req, res) => {
  const data = await db.getUsers();
  res.json(data);
});

Router.post('/users', async (req, res) => {
  const query = req.query;
  const inserted = await db.insertUser(db.createUser(user));
  res.json(inserted);
});

Router.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    res.status(501).send({
      error: "You need to provide a correct id"
    });
  } else {
    const deleted = await db.deleteUser(id);
    res.json({
      id: deleted
    });
  }
});

export default Router;
>>>>>>> 3cf9834cf456c6020bcf43d6943cb4037725bc96
