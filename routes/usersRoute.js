(function () {
    const Router = require('express').Router();
    const Database = require('../database/database');
    const {
        check,
        validationResult,
        param
    } = require('express-validator');
    const jwt = require('jsonwebtoken');

    const service = new Database();

    Router.get('/', async (req, res) => {
        const users = await service.getUsers();
        res.send(users);
    });

    Router.get('/:id', [check('x-access-token').exists()], async (req, res) => {
        const token = req.headers['x-access-token'];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(401);
            res.send({
                errors: errors.array()
            });
        }

        jwt.verify(token, service.getPrivateKey(), (err, decoded) => {
            if (err) {
                res.status(500);
                res.send({
                    auth: false,
                    message: "Failed to authenticate token."
                });
            }

            res.status(200);

            const user = service.getUserById(req.params.id);

            res.send({
                user,
                decoded
            });
        })
    });

    Router.get('/:limit', [
        param('limit').exists().bail().isLength({
            min: 1,
            max: 30
        })
    ], async (req, res) => {
        const {
            limit
        } = req.params;
        const errors = validationResult(param);
        if (!errors.isEmpty()) {
            res.status(422);
            res.send({
                errors: errors.array(),
                limit
            })
        } else {
            const users = await service.getUsersWithLimit(limit);
            res.send(users);
        }
    });

    Router.post('/', [
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({
            min: 5,
            max: 70
        })
    ], async (req, res) => {
        const {
            email,
            password
        } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422);
            res.json({
                errors: errors.array()
            });
        } else {
            const id = await service.insertUser(email, password);
            if (id === -1) {
                res.status(503)
                res.json({
                    message: "Failure on the backend"
                })
            } else {
                res.status(200)
                res.json(id);
            }
        }
    });

    Router.delete('/', (req, res) => {
        res.send("DELETE")
    });

    Router.put('/', async (req, res) => {
        res.send("PUT!");
    });

    module.exports = Router
})();