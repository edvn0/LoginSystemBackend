/*
    Express router to handle all api calls for 
    db insertion, get all users etc.

    All routes here will be /api/{function}
*/
import express from 'express';
const Router = express.Router();

Router.get('/get', (req, res) => {
  res.send('Well hello from inside of the Router');
})

export default Router;
