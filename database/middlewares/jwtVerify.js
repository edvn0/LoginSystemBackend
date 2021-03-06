(function () {
    const jwt = require('jsonwebtoken');
    const private = require('../db_config').googleApiKey;

    const checkToken = (req, res, next) => {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }

            jwt.verify(token, private, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: "Invalid token."
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: false,
                message: "Auth token is not supplied."
            })
        }
    };

    module.exports = {
        checkToken: checkToken
    };
})();