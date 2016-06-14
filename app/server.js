var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var props = require('./libs/properties');
var freeFormRequest = require('./libs/free-form');
var tasksRepository = require('./libs/tasks-repository');
var usersRepository = require('./libs/users-repository');
var path = require('path');

var app = express();
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/views'));

mongoose.connect(props.get("mongo:url")
  .replace('{BALANCED_DB_PASSWORD}', props.get('BALANCED_DB_PASSWORD'))
  .replace('{BALANCED_DB_USER}', props.get('BALANCED_DB_USER')));

app.get("/tasks/:key", function(req, res) {
  console.log("retrieving tasks for user " + req.params.key);
  tasksRepository.getAllTasks(req.params.key, function(err, tasks) {
    if (err) console.log(err);
    res.status(200).send(tasks);
  });
});

app.post('/tasks/:id', function(req, res) {
  console.log('delete single: ' + req.params.id);
  tasksRepository.deleteSingle(req.params.id, function(err, task) {
    if (err) console.log(err);
    console.log('deleted task ', task._id)
    res.redirect('/');
  });
});

app.post("/tasks", bodyParser.json(), function(req, res) {
  console.log('insert new task: ' + req.body);
  tasksRepository.insert(req.body, function(err) {
    if (err) console.log(err);
    res.status(201).send();
  });
});

app.post("/requests", bodyParser.json(), function(req, res) {
  console.log(req.body);
  freeFormRequest(req.body.key, req.body.ask, function(err, result) {
    if (err) console.log(err);
    if (result) res.send(result);
    res.status(400).send();
  });
});

app.post("/users", bodyParser.json(), function(req, res) {
  console.log("create new user");
  console.log(req.body);
  var email = req.body ? req.body.email : null;
  usersRepository.insert(email, function(err, user) {
    if (err) {
      console.log(err);
      res.send("could not create new user: " + err);
    } else {
      res.status(201).send( {
        key: user.key,
        email: user.email
      });
    }
  });
});

app.put("/users/:key", bodyParser.json(), function(req, res) {
  console.log("update user " + req.params.key);
  console.log(req.body);
  usersRepository.update(req.params.key, req.body.email, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).send("could not update user: " + err);
    } else if(user) {
      res.status(200).send( {
        key: user.key,
        email: user.email
      });
    } else {
      res.status(404).send();
    }
  });
});

var server = app.listen(props.get("server:port"), function() {
  console.log("listening on port ".concat(props.get("server:port")));
});

module.exports = server;