var nconf = require('nconf'),
    config = require('./config'),
    mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

nconf.argv()
  .env()
  .file({ file: './config.json' });

var _db;
var url = nconf.get("mongo:url");

module.exports = {
  connectToServer: function(callback) {
    mongoClient.connect(url, function(err, db) {
      db.authenticate(nconf.get("mongo:username"), nconf.get("BALANCED_DB_PASSWORD"), function(err, result) {
        _db = db;
        return callback(err);
      });
    });
  },

  getDb: function() {
    return _db;
  }
}
