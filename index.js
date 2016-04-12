var fs = require('fs'),
    nconf = require('nconf'),
    express = require('express'),
    mongo = require('./mongoUtil')
    assert = require('assert'),
    bodyParser = require('body-parser');

nconf.argv()
  .env()
  .file({ file: './config.json' });

var app = express();
app.listen(nconf.get("server:port"), function() {
  console.log("listening on port ".concat(nconf.get("server:port")));
})

mongo.connectToServer(function(err) {
  var db = mongo.getDb();
  findTasks(db, function() {
    console.log("get endpoints initialized");
  });
  initPostEndpoint(db, function() {
    console.log("post endpoints initialized");
  });
});

function findTasks(db, callback) {
  var cursor = db.collection('tasks').find();
  cursor.each(function(err, task) {
    assert.equal(err, null);
    if (task != null) {
      app.get("/".concat(task.type), function (req, res) {
        db.collection('tasks').find({ 'type': task.type }).toArray(function(err, tasks) {
          res.send(tasks);
        });
      });
    } else {
      callback();
    }
  });
}

function initPostEndpoint(db, callback) {
  app.post("/tasks", bodyParser.json(), function(req, res) {
    db.collection('tasks').insertOne(
    {
      "type": req.body.type,
      "quadrant": req.body.quadrant,
      "description": req.body.description,
      "date": new Date()
    }, function (err, result) {
        assert.equal(err, null);
        console.log("inserted new task");
    });
    res.end("OK");
  });
  callback();
}
