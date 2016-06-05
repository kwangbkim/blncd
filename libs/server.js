var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  props = require('./properties'),
  freeFormRequest = require('./free-form'),
  repository = require('./tasks-repository'),
  path = require('path');

var app = express();
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/../public'));
app.use(express.static(__dirname + '/../public'));

mongoose.connect(props.get("mongo:url")
  .replace('{BALANCED_DB_PASSWORD}', props.get('BALANCED_DB_PASSWORD'))
  .replace('{BALANCED_DB_USER}', props.get('BALANCED_DB_USER')));

app.get('/', function(req, res) {
  res.render('index');
});

app.get("/tasks", function(req, res) {
  console.log('retrieving tasks');
  var f = function(task, quadrant) {
    return task.quadrant == quadrant;
  };

  repository.getAllTasks(function(err, tasks) {
    if (err) console.log(err);
    res.render('tasks', {
      tasks1: tasks.filter(function (t) {
        return f(t, 1);
      }) || [],
      tasks2: tasks.filter(function (t) {
        return f(t, 2);
      }) || [],
      tasks3: tasks.filter(function (t) {
        return f(t, 3);
      }) || [],
      tasks4: tasks.filter(function (t) {
        return f(t, 4);
      }) || []
    });
  });
});

app.get("/tasks/:type", function(req, res) {
  console.log('get tasks by type: ' + req.params.type);
  repository.getTasksByType(req.params.type, function(err, tasks) {
    if (err) console.log(err);
    res.send(tasks);
  });
});

app.post("/tasks", bodyParser.json(), function(req, res) {
  console.log('insert new task: ' + req.body);
  repository.insert(req.body.type, req.body.description, req.body.quadrant, function(err) {
    if (err) console.log(err);
    res.status(201).send();
  });
});

app.get("/quadrants/:num", function(req, res) {
  console.log('get tasks by quadrant: ' + req.params.num);
  repository.getTasksByQuadrant(req.params.num, function(err, tasks) {
    if (err) console.log(err);
    res.send(tasks);
  });
});

app.delete('/tasks/type/:type', function(req, res) {
  console.log('delete tasks of type: ' + req.params.type);
  repository.deleteByType(req.params.type, function(err) {
    if (err) console.log(err);
    res.redirect('/tasks');
  });
});

app.post('/tasks/:id', function(req, res) {
  console.log('delete single: ' + req.params.id);
  repository.deleteSingle(req.params.id, function(err, task) {
    if (err) console.log(err);
    console.log('deleted task ', task._id)
    res.redirect('/tasks');
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