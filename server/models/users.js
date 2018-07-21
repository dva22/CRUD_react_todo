const DB = require('../db'),
    COLLECTION = 'users';

function hash(text) {
    return text//bcrypt.hashSync(text, 10);
}

exports.create = function(user, cb) {
    let newUser = {
        username: user.username,
        password: hash(user.password),
        dateCreate: new Date()
    };

    let db = DB.getDB();
    db.collection(COLLECTION)
        .insert(newUser, function(err, docs) {
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
    db.collection(COLLECTION).findOne({'_id' : new DB.ObjectId(id)}, cb)
};

exports.authenticate = function(username, password, cb) {
    let db = DB.getDB();
    db.collection(COLLECTION)
        .findOne({username: username}, function(err, doc) {
            if (err) return cb(err);

            if (!doc) return cb(null, doc);

            if (doc.password === hash(password)) {
                cb(null, doc)
            } else {
                cb()
            }
        })
}