const Router = require('express').Router();
const Database = require('../database/database');
const {
    check,
    validationResult,
    param
} = require('express-validator');
const {
    checkToken
} = require('../database/middlewares/jwtVerify');

const service = new Database();

(function () {
    Router.get('/', checkToken, async (req, res) => {
        const users = await service.getUsers();
        res.send({
            users
        });
    });

    Router.get('/id/:id', checkToken, async (req, res) => {
        const {
            id
        } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(401);
            res.send({
                errors: errors.array()
            });
        }

        const user = await service.getUserById(id);
        const readUser = {
            ...user,
            _readAt: new Date(Date.now()).toLocaleString()
        };

        res.send(user ? {
            success: true,
            user: readUser
        } : {
            success: false,
            message: "User is not in the database."
        });
    });

    Router.get('/limit/:limit', [
        check('limit').exists().bail().isLength({
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