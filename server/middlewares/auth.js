const User = require('../models/users'),
    jwt = require('jsonwebtoken'),
    config = require('../config');

exports.authorize = function (req, res, next)  {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Failed to authorize' });
            } else {
                User.get( decoded.userId , function (err, user){
                    if (!user) {
                        res.status(404).json({ error: 'No such user' });
                    } else {
                        req.currentUser = user;
                        next();
                    }
                });
            }
        });
    } else {
        res.status(403).json({
            error: 'No token provided'
        });
    }
}
//module.exports = authorize;

