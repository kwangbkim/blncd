var fs = require('fs'),
    nconf = require('nconf'),
    express = require('express'),
    app = express(),
    config = require('./config'),
    mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

nconf.argv()
  .env()
  .file({ file: './config.json' });

app.listen(nconf.get("server:port"), function() {
  console.log("listening on port ".concat(config.server.port));
})

var url = nconf.get("mongo:url");
mongoClient.connect(url, function(err, db) {
  assert.equal(err, null);
  findTasks(db, function() {
    console.log("endpoints initialized");
  })
})

var findTasks = function(db, callback) {
  db.authenticate(nconf.get("mongo:username"), nconf.get("BALANCED_DB_PASSWORD"), function(err, result) {
    assert.equal(err, null);
    console.log("connected to mongo");

    var cursor = db.collection('tasks').find();
    cursor.each(function(err, task) {
      assert.equal(err, null);
      if (task != null) {
        app.get("/".concat(task.type), function (req, res) {
          db.collection('tasks').find({ 'type': task.type }).toArray(function(err, tasks) {
            res.send(tasks);
          });
        })
      } else {
        callback();
      }
    })
  })
}
