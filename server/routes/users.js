const express = require('express'),
commonValidations = require('../validations/signup'),
Users = require('../models/users'),
Notes = require('../models/notes'),
authMiddle = require('../middlewares/auth'),
router = express.Router();

function validateInput(data, otherValidations) {
    let {errors, isValid} = otherValidations('allForm', data);

    return {
        errors,
        isValid: isValid
    };

}

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Users.get(id, (err, user) => {
        if(!user) {
            res.statusCode = 404;
            return res.send({ error: 'Not found user' });
        }
        if (err) {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        } else {
            return res.send({ status: 'OK', notes: user});
        }
    });
});

router.get('/:id/notes', (req, res) => {

    const id = req.params.id;
    const limit = req.query.limit || 10;
    const skip = req.query.skip || 0;
    Users.get(id, (err, user) => {
        if(!user) {
            res.statusCode = 404;
            return res.send({ error: 'Not found user' });
        }
        if (err) {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        } else {
            console.log('Notes.getWhereUser');
            console.log(user._id);
            Notes.getWhereUser(user._id, limit, skip, (err, notes) => {

                if(!notes) {
                    res.statusCode = 404;
                    return res.send({ error: 'Not found note with it user' });
                }
                if (err) {
                    res.statusCode = 500;
                    return res.send({ error: 'Server error' });
                } else {
                    return res.send({ status: 'OK', notes: notes});
                }
            })
        }
    });
});

router.post('/', (req, res) => {

    let {errors, isValid} = validateInput(req.body, commonValidations);

    if (isValid) {

        Users.create(req.body,function(err, docs) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.send(docs);
            }
        });

    } else {

        res.status(400).json(errors);
    }

});

module.exports = router;