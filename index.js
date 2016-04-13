var fs = require('fs'),
    express = require('express'),
    mongodb = require('mongodb');
    assert = require('assert'),
    bodyParser = require('body-parser'),
    mongo = require('./mongoUtil'),
    props = require('./properties');

var app = express();
app.listen(props.get("server:port"), function() {
  console.log("listening on port ".concat(props.get("server:port")));
})

mongo.connectToServer(function(err) {
  var db = mongo.getDb();

  app.get("/tasks/:type", function (req, res) {
    db.collection('tasks').find({ 'type': req.params.type }).toArray(function(err, tasks) {
      assert.equal(err, null);
      res.send(tasks);
    });
  });

  app.post("/tasks", bodyParser.json(), function(req, res) {
    console.log(req.body.description);
    db.collection('tasks').insertOne(
    {
      "description": req.body.description,
      "quadrant": req.body.quadrant,
      "type": req.body.type,
      "date": new Date()
    }, function (err, result) {
        assert.equal(err, null);
        console.log("inserted new task " + result);
    });
    res.end("OK");
  });

  app.get("/quadrants/:id", function (req, res) {
    console.log(req.params.id);
    db.collection('tasks').find({ 'quadrant': parseInt(req.params.id) }).toArray(function(err, tasks) {
      assert.equal(err, null);
      res.send(tasks);
    });
  });

  app.delete('/tasks/:type', function(req, res) {
    db.collection('tasks').remove({ 'type': req.params.type }, function (err, result) {
      assert.equal(err, null);
      res.send("OK");
    });
  });

  app.delete('/tasks/:type/:id', function(req, res) {
    db.collection('tasks', function(err, collection) {
      assert.equal(err, null);
      collection.remove({ _id: new mongodb.ObjectID(req.params.id) }, function (err, result) {
        assert.equal(err, null);
        res.send("OK");
      });
    });
  });
});
