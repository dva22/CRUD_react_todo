// mongo = 1 use mongodb, mongo = 0 use tingodb,
const mongo = 0;

if (mongo === 1) {
    var MongoClient = require('mongodb').MongoClient;
    module.exports.ObjectId = require('mongodb').ObjectId;
} else {
    var Engine = require('tingodb')({nativeObjectID: true});
    module.exports.ObjectId = Engine.ObjectID;
}

let state = {
    db: null,
};

exports.connect = function(url, done) {
    if (state.db) return done();

    if (mongo === 1) {
        MongoClient.connect(url, function (err, database) {
            if (err) return done(err);
            state.db = database.db('mongo');
            done()
        })
    } else {
        state.db = new Engine.Db('./user', {});
        done()
    }

};

exports.getDB = function() {
    return state.db
};

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            done(err)
        })
    }
};
