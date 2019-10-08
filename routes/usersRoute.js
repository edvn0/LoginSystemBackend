(function () {
    const Router = require('express').Router();
    const Database = require('../database/database');
    const {
        check,
        validationResult,
        param
    } = require('express-validator');
    const jwt = require('jsonwebtoken');
    const {
        checkToken
    } = require('../database/middlewares/jwtVerify');

    const service = new Database();

    Router.get('/', [check('x-access-token').exists()], async (req, res) => {


        const token = req.headers['x-access-token'];

        jwt.verify(token, service.getPrivateKey(), async (err, decoded) => {
            if (err) {
                res.status(500);
                res.send({
                    auth: false,
                    message: "Failed to authenticate token."
                });
            } else {
                const users = await service.getUsers();
                res.send({
                    users,
                    decoded
                });
            }

        });
    });

    Router.get('/id/:id', [check('x-access-token').exists()], async (req, res) => {
        const token = req.headers['x-access-token'];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(401);
            res.send({
                errors: errors.array()
            });
        }
        res.send({
            id
        });
    });

    Router.get('/limit/:limit', [
        param('limit').exists().bail().isLength({
            min: 1,
            max: 30
        })
    ], checkToken, async (req, res) => {
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

    Router.delete('/', (req, res) => {
        res.send("DELETE")
    });

    Router.put('/', async (req, res) => {
        res.send("PUT!");
    });

    module.exports = Router
})();