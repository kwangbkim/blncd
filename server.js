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
app.set('views', path.join(__dirname, '/public'));

app.use(express.static(__dirname + '/public'));

mongoose.connect(props.get("mongo:url")
  .replace('{BALANCED_DB_PASSWORD}', props.get('BALANCED_DB_PASSWORD'))
  .replace('{BALANCED_DB_USER}', props.get('BALANCED_DB_USER')));

app.get("/api/tasks/:key", function(req, res) {
  console.log("retrieving tasks for user " + req.params.key);
  tasksRepository.getAllTasks(req.params.key, function(err, tasks) {
    if (err) console.error(err);
    res.status(200).send(tasks);
  });
});

app.post('/api/tasks/:id', function(req, res) {
  console.log('delete single: ' + req.params.id);
  tasksRepository.deleteSingle(req.params.id, function(err, task) {
    if (err) console.error(err);
    console.log('deleted task ', task._id)
    res.redirect('/');
  });
});

app.post("/api/tasks", bodyParser.json(), function(req, res) {
  console.log('insert new task: ' + req.body);
  tasksRepository.insert(req.body, function(err) {
    if (err) console.error(err);
    res.status(201).send();
  });
});

app.post("/api/requests", bodyParser.json(), function(req, res) {
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');

  var apiKey = req.body.key;
  usersRepository.getByKey(req.body.key, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).send({
        error: err
      });
    } else if (!user) {
      console.log("could not find user with api key: " + apiKey);
      res.status(404).send();
    } else {
      freeFormRequest(req.body.key, req.body.ask, function(err, result) {
        if (err) {
          console.error(err);
          res.status(400).send(JSON.stringify({
            error: err
          }));
        }
        if (result) res.send(result);
      });
    }
  })
});

app.post("/api/users", bodyParser.json(), function(req, res) {
  console.log("create new user:", req.body);

  res.setHeader('Content-Type', 'application/json');
  var email = req.body ? req.body.email : null;
  usersRepository.insert(email, function(err, user) {
    if (err) {
      console.error(err);
      res.status(400).send({
        message: "could not create new user",
        error: err
      });
    } else {
      res.status(201).send({
        key: user.key,
        email: user.email
      });
    }
  });
});

app.put("/api/users/:key", bodyParser.json(), function(req, res) {
  console.log("update user %s:", req.params.key, req.body);

  usersRepository.update(req.params.key, req.body.email, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).send({
        message: "could not update user",
        error: err
      });
    } else if (user) {
      res.status(200).send({
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