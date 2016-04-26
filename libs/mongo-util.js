var props = require('./properties.js'),
    mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var _db;
var url = props.get("mongo:url");

module.exports = {
    connectToServer: function(callback) {
        mongoClient.connect(url, function(err, db) {
            db.authenticate(props.get("mongo:username"), props.get("BALANCED_DB_PASSWORD"), function(err, result) {
                _db = db;
                return callback(err);
            });
        });
    },

    getDb: function() {
        return _db;
    }
}
