const Router = require('express').Router();

Router.get('/users', (req, res) => {
    res.send("GET")
});

Router.post('/users', (req, res) => {
    res.send("POST")
});

Router.delete('/users', (req, res) => {
    res.send("DELETE")
});

Router.put('/users', (req, res) => {
    res.send("PUT")
});

module.exports = Router;