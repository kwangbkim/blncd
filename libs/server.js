"use strict";
var fs = require('fs'),
    express = require('express'),
    mongoose = require('mongoose'),
    assert = require('assert'),
    bodyParser = require('body-parser'),
    http = require('http'),
    props = require('./properties'),
    freeFormRequest = require('./free-form'),
    Task = require('./tasks');

var app = express();
mongoose.connect(props.get("mongo:url"));

app.get("/tasks", function(req, res) {
    Task.find({}).sort('quadrant').exec(function (err, tasks) {
        if (err) console.log(err);
        res.send(tasks);
    });
});

app.get("/tasks/:type", function(req, res) {
    Task.find({type: req.params.type}).sort('quadrant').exec(function (err, tasks) {
        if (err) console.log(err);
        res.send(tasks);
    });
});

app.post("/tasks", bodyParser.json(), function(req, res) {
    console.log(req.body.description);
    var task = new Task({
        description: req.body.description,
        quadrant: parseInt(req.body.quadrant),
        type: req.body.type,
    });
    task.save(function (err){
        if (err) console.log(err);
        console.log('inserted new task\n' + task);
        res.send(task);
    });
});

app.get("/quadrants/:num", function(req, res) {
    Task.find({quadrant: parseInt(req.params.num)}, function (err, tasks) {
        if (err) console.log(err);
        res.send(tasks);
    });
});

app.delete('/tasks/type/:type', function(req, res) {
    console.log('delete tasks of type: ' + req.params.type);
    Task.find({type: req.params.type}).remove(function (err) {
        if (err) console.log(err);
        res.status(204).send();
    });
});

app.delete('/tasks/:id', function(req, res) {
    console.log('delete single: ' + req.params.id);
    Task.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, function (err, task) {
        if (err) console.log(err);
        if (task) {
            console.log(task);
            task.remove();
            res.status(204).send();
        } else
            res.status(404).send('not found');
    });
});

app.post("/requests", bodyParser.json(), function(req, res) {
    console.log(req.body);
    freeFormRequest(req.body.ask, function(result) {
        if (res) {
            res.send(result);
        }
    });
});

var server = app.listen(props.get("server:port"), function() {
    console.log("listening on port ".concat(props.get("server:port")));
});

module.exports = server;
