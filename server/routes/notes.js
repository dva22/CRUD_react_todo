const express = require('express'),
    jwtDecode = require('jwt-decode'),
    Notes = require('../models/notes'),
    commonValidations = require('../validations/note'),
    authMiddle = require('../middlewares/auth'),
    router = express.Router();

function validateInput(data, otherValidations) {
    let {errors, isValid} = otherValidations('allForm', data);

    return {
        errors,
        isValid: isValid
    };

}

router.get('/', (req, res) => {
    const limit = req.query.limit || 10;
    const skip = req.query.skip || 0;

    Notes.getAll(limit, skip, (err, notes) => {
        if (!notes) {
            res.statusCode = 404;
            return res.send({error: 'Not found notes'});
        }
        if (err) {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        } else {
            return res.send({status: 'OK', notes: notes});
        }
    })

});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Notes.get(id, (err, notes) => {
        if (!notes) {
            res.statusCode = 404;
            return res.send({error: 'Not found notes with it user'});
        }
        if (err) {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        } else {
            return res.send({status: 'OK', notes: notes});
        }
    })

});

router.post('/', (req, res) => {
    const {userId, username} = jwtDecode(req.body.jwtToken);
    const {note , description} = req.body;

    let {errors, isValid} = validateInput(req.body, commonValidations);
    isValid = true;

    if (isValid) {

        Notes.create({userId, username, note , description}, function (err, docs) {
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