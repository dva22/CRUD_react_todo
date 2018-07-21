const express =  require('express');
const User =  require('../models/users');
const jwt =  require('jsonwebtoken');
const config =  require('../config');

let router = express.Router();

router.post('/', (req, res) => {
    const { identifier, password } = req.body;

    User.authenticate(identifier, password, function(err, user) {
        if (err)
            return res.status(401).json({ errors: { form: 'Invalid Credentials' } });

        if (!user) {
            res.statusCode = 404;
            return res.send({error: 'User or password is wrong'});
        }

        if (user) {
            const token = jwt.sign({
                userId: user['_id'],
                username: user['username'],
                dateCreate: new Date()
            }, config.jwtSecret);
            res.json({ token });
        } else {
            res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
    })

});

module.exports = router;