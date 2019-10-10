// eslint-disable-next-line new-cap
const Router = require('express').Router();
const Database = require('../database/database');
const {
  checkToken,
} = require('../database/middlewares/jwtVerify');
const jwt = require('jsonwebtoken');
const secret = require('../database/db_config').googleApiKey;

const service = new Database();

(function() {
  Router.post('/', async (req, res) => {
    const {
      email,
      password,
    } = req.body;
    const userInDb = await service.getUser(email, password);
    if (!userInDb) {
      res.json({
        success: false,
        message: 'User currently not in database.',
      });
    } else {
      const token = jwt.sign({
        username: email,
      }, secret, {
        expiresIn: '1h',
      });

      res.json({
        success: true,
        message: 'Authentication successful.',
        token: token,
      });
    }
  });

  Router.get('/', checkToken);

  module.exports = Router;
})();
