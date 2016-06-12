var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var props = require('./libs/properties');
var freeFormRequest = require('./libs/free-form');
var repository = require('./libs/tasks-repository');
var path = require('path');

var app = express();
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/views'));

mongoose.connect(props.get("mongo:url")
  .replace('{BALANCED_DB_PASSWORD}', props.get('BALANCED_DB_PASSWORD'))
  .replace('{BALANCED_DB_USER}', props.get('BALANCED_DB_USER')));

app.get("/", function(req, res) {
  console.log('retrieving tasks');
  var f = function(task, quadrant) {
    return task.quadrant == quadrant;
  };

  repository.getAllTasks(function(err, tasks) {
    if (err) console.log(err);
    res.render('tasks', {
      tasks1: tasks.filter(function(t) {
        return f(t, 1);
      }) || [],
      tasks2: tasks.filter(function(t) {
        return f(t, 2);
      }) || [],
      tasks3: tasks.filter(function(t) {
        return f(t, 3);
      }) || [],
      tasks4: tasks.filter(function(t) {
        return f(t, 4);
      }) || []
    });
  });
});

app.post('/tasks/:id', function(req, res) {
  console.log('delete single: ' + req.params.id);
  repository.deleteSingle(req.params.id, function(err, task) {
    if (err) console.log(err);
    console.log('deleted task ', task._id)
    res.redirect('/');
  });
});

app.post("/tasks", bodyParser.json(), function(req, res) {
  console.log('insert new task: ' + req.body);
  repository.insert(req.body.type, req.body.description, req.body.quadrant, function(err) {
    if (err) console.log(err);
    res.status(201).send();
  });
});

app.post("/requests", bodyParser.json(), function(req, res) {
  console.log(req.body);
  freeFormRequest(req.body.ask, function(err, result) {
    if (err) console.log(err);
    if (result) res.send(result);
    res.status(400).send();
  });
});

var server = app.listen(props.get("server:port"), function() {
  console.log("listening on port ".concat(props.get("server:port")));
});

module.exports = server;