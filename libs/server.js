"use strict";
var fs = require('fs'),
  express = require('express'),
  mongoose = require('mongoose'),
  assert = require('assert'),
  bodyParser = require('body-parser'),
  http = require('http'),
  props = require('./properties'),
  freeFormRequest = require('./free-form'),
  Task = require('./tasks'),
  repository = require('./tasks-repository');

var app = express();
mongoose.connect(props.get("mongo:url"));

app.get("/tasks", function (req, res) {
  console.log('get all tasks');
  repository.getAllTasks(function (err, tasks) {
    if (err) console.log(err);
    res.send(tasks);
  });
});

app.get("/tasks/:type", function (req, res) {
  console.log('get tasks by type: ' + req.params.type);
  repository.getTasksByType(req.params.type, function (err, tasks) {
    if (err) console.log(err);
    res.send(tasks);
  });
});

app.post("/tasks", bodyParser.json(), function (req, res) {
  console.log('insert new task: ' + req.body);
  repository.insert(req.body.type, req.body.description, req.body.quadrant, function (err) {
    if (err) console.log(err);
    res.status(201).send();
  });
});

app.get("/quadrants/:num", function (req, res) {
  console.log('get tasks by quadrant: ' + req.params.num);
  repository.getTasksByQuadrant(req.params.num, function (err, tasks) {
    if (err) console.log(err);
    res.send(tasks);
  });
});

app.delete('/tasks/type/:type', function (req, res) {
  console.log('delete tasks of type: ' + req.params.type);
  repository.deleteByType(req.params.type, function (err) {
    if (err) console.log(err);
    res.status(204).send();
  });
});

app.delete('/tasks/:id', function (req, res) {
  console.log('delete single: ' + req.params.id);
  repository.deleteSingle(req.params.id, new function (err, isDeleted) {
    if (err) console.log(err);
    if (isDeleted) res.status(204).send();
    res.status(404).send();
  });
});

app.post("/requests", bodyParser.json(), function (req, res) {
  console.log(req.body);
  freeFormRequest(req.body.ask, function (err, result) {
    if (err) console.log(err);
    if (result) res.send(result);
    res.status(400).send();
  });
});

var server = app.listen(props.get("server:port"), function () {
  console.log("listening on port ".concat(props.get("server:port")));
});

module.exports = server;
