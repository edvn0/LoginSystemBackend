const Router = require('express').Router();

Router.get('/', (req, res) => {
    res.send("GET")
});

Router.post('/', (req, res) => {
    const {
        body
    } = req;
    res.send(body);
});

Router.delete('/', (req, res) => {
    res.send("DELETE")
});

Router.put('/', (req, res) => {
    res.send("PUT")
});

module.exports = Router;