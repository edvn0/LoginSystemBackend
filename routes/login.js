/*
    Express router to handle all api calls for 
    db insertion, get all users etc.

    All routes here will be /api/{function}
*/
import Database from '../database/database'
import express from 'express';
const Router = express.Router();

const db = new Database();

Router.get('/users', async (req, res) => {
  const data = await db.getUsers();
  res.json(data);
})

export default Router;
