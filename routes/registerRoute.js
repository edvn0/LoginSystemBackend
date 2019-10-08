(function () {
    const Router = require('express').Router();
    const {
        check,
        validationResult
    } = require('express-validator');

    const Database = require('../database/database');
    const service = new Database();

    Router.post('/', [
        check('email').isEmail(),
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
            if (!id) {
                res.status(503)
                res.json({
                    message: "Failure on the backend"
                })
            } else {
                res.status(200)
                res.json({
                    success: true,
                    message: `User with id ${id} was inserted into the database.`
                });
            }
        }
    });

    module.exports = Router;
})()