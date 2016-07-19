const log = require('./libs/log');
const express = require('express');
const bodyParser = require('body-parser');
const props = require('./libs/properties');
const freeFormRequest = require('./libs/free-form');
const tasksRepository = require('./libs/tasks-repository');
const usersRepository = require('./libs/users-repository');
const path = require('path');
require('./libs/mongo-init');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

app.get('/install', (req, res) => {
  log.info("get install page");
  res.sendFile(path.join(__dirname, '/public/install.html'));
});

app.get('/usage', (req, res) => {
  log.info("get usage page");
  res.sendFile(path.join(__dirname, '/public/usage.html'));
});

app.get('/api', (req, res) => {
  log.info("get api page");
  res.sendFile(path.join(__dirname, '/public/api.html'));
});

app.post('/api/requests', bodyParser.json(), (req, res) => {
  log.info(req.body);
  res.setHeader('Content-Type', 'application/json');

  const apiKey = req.body.key;
  usersRepository.getByKey(req.body.key, (err, user) => {
    if (err) {
      log.error(err);
      res.status(500).send({
        error: err
      });
    } else if (!user) {
      const msg = 'could not find user with api key: ' + apiKey;
      log.info(msg);
      res.status(404).send({
        error: msg
      });
    } else {
      freeFormRequest(req.body.key, req.body.ask, (err, result) => {
        if (err) {
          log.error(err);
          res.status(500).send(JSON.stringify({
            error: err
          }));
        } else
          res.send(result);
      });
    }
  })
});

app.post('/api/users', bodyParser.json(), (req, res) => {
  log.info('create new user:', req.body);

  res.setHeader('Content-Type', 'application/json');
  const email = req.body ? req.body.email : null;
  usersRepository.insert(email, (err, user) => {
    if (err) {
      log.error(err);
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
  log.info("update user %s:", req.params.key, req.body);

  usersRepository.update(req.params.key, req.body.email, (err, user) => {
    if (err) {
      log.error(err);
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
  log.info("delete user %s:", req.params.key, req.body);

  usersRepository.delete(req.params.key, (err, user) => {
    if (err) {
      log.error(err);
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
app.listen(port, function() {
  log.log('Server running on port %d', port);
});

module.exports = app;