const Router = require('express').Router();

Router.get('/', (req, res) => {
    res.send("GET")
});

Router.post('/', (req, res) => {
    res.send("POST")
});

Router.delete('/', (req, res) => {
    res.send("DELETE")
});

Router.put('/', (req, res) => {
    res.send("PUT")
});

module.exports = Router;