const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const props = require('./libs/properties');
const freeFormRequest = require('./libs/free-form');
const tasksRepository = require('./libs/tasks-repository');
const usersRepository = require('./libs/users-repository');
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/public'));

mongoose.connect(props.get("mongo:url")
  .replace('{BALANCED_DB_PASSWORD}', props.get('BALANCED_DB_PASSWORD'))
  .replace('{BALANCED_DB_USER}', props.get('BALANCED_DB_USER')));

app.get('/', (req, res) => {
  console.log("get home page");
  res.render('index');
});

app.get('/api/tasks/:key', (req, res) => {
  console.log('retrieving tasks for user ' + req.params.key);
  tasksRepository.getAllTasks(req.params.key, (err, tasks) => {
    if (err) console.error(err);
    res.status(200).send(tasks);
  });
});

app.post('/api/tasks/:id', (req, res) => {
  console.log('delete single: ' + req.params.id);
  tasksRepository.deleteSingle(req.params.id, (err, task) => {
    if (err) console.error(err);
    console.log('deleted task ', task._id)
    res.redirect('/');
  });
});

app.post('/api/requests', bodyParser.json(), (req, res) => {
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');

  const apiKey = req.body.key;
  usersRepository.getByKey(req.body.key, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        error: err
      });
    } else if (!user) {
      console.log('could not find user with api key: ' + apiKey);
      res.status(404).send();
    } else {
      freeFormRequest(req.body.key, req.body.ask, (err, result) => {
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

app.post('/api/users', bodyParser.json(), (req, res) => {
  console.log('create new user:', req.body);

  res.setHeader('Content-Type', 'application/json');
  const email = req.body ? req.body.email : null;
  usersRepository.insert(email, (err, user) => {
    if (err) {
      console.error(err);
      res.status(400).send({
        message: 'could not create new user',
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

app.put('/api/users/:key', bodyParser.json(), (req, res) => {
  console.log("update user %s:", req.params.key, req.body);

  usersRepository.update(req.params.key, req.body.email, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        message: 'could not update user',
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

app.delete('/api/users/:key', bodyParser.json(), (req, res) => {
  console.log("delete user %s:", req.params.key, req.body);

  usersRepository.delete(req.params.key, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        message: 'could not update user',
        error: err
      });
    } else if (user) {
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  });
});

const port = props.get('server:port');
app.listen(port, function () {
  console.log('Server running on port %d', port);
});

module.exports = app;