const DB = require('../db')
    , COLLECTION = 'notes';


exports.create = function(note, cb) {

    let newNote = {
        username: note.username,
        note: note.note,
        description: note.description,
        userId: note.userId,
        dateCreate: new Date()
    };

    let db = DB.getDB();
    db.collection(COLLECTION)
        .insert(newNote, function(err, docs) {
            if (err) return cb(err);
            cb(null, docs)
        })
};

exports.all = function(cb) {
    let db = DB.getDB();
    db.collection(COLLECTION).find().toArray(cb)
};

exports.remove = function(id, cb) {
    let db = DB.getDB();
    db.collection(COLLECTION)
        .remove({_id:id}, function(err, docs) {
            cb(err)
        })
};

exports.get = function(id, cb) {
    let db = DB.getDB();
    db.collection(COLLECTION).findOne({_id:id}, cb)
};

exports.getWhereUser = function(userId, limit, skip, cb) {
    let db = DB.getDB();
    db.collection(COLLECTION).find({userId:userId.toString()}).limit(parseInt(limit,10)).skip(parseInt(skip,10)).toArray(function(err, docs) {
        if (err) return cb(err);
        cb(null, docs)
    })
};

exports.getAll = function(limit, skip, cb) {
    let db = DB.getDB();
    db.collection(COLLECTION).find({}).limit(parseInt(limit,10)).skip(parseInt(skip,10)).toArray(function(err, docs) {
        if (err) return cb(err);
        cb(null, docs)
    })
};
