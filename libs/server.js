"use strict";
var fs = require('fs'),
    express = require('express'),
    mongodb = require('mongodb'),
    assert = require('assert'),
    bodyParser = require('body-parser'),
    mongo = require('./mongo-util'),
    http = require('http'),
    props = require('./properties');

var app = express();

function initGetTasksByTypeEndpoint(db) {
    app.get("/tasks/:type", function(req, res) {
        db.collection('tasks').find({
            'type': req.params.type
        }).toArray(function(err, tasks) {
            assert.equal(err, null);
            res.send(tasks);
        });
    });
}

function initAddNewTaskEndpoint(db) {
    app.post("/tasks", bodyParser.json(), function(req, res) {
        console.log(req.body.description);
        db.collection('tasks').insertOne({
            "description": req.body.description,
            "quadrant": req.body.quadrant,
            "type": req.body.type,
            "date": new Date()
        }, function(err, result) {
            assert.equal(err, null);
            console.log("inserted new task " + result);
        });
        res.end("OK");
    });
}

function initGetTasksByQuadrantEndpoint(db) {
    app.get("/quadrants/:id", function(req, res) {
        console.log(req.params.id);
        db.collection('tasks').find({
            'quadrant': parseInt(req.params.id, 10)
        }).toArray(function(err, tasks) {
            assert.equal(err, null);
            res.send(tasks);
        });
    });
}

function initDeleteTasksByTypeEndpoint(db) {
    app.delete('/tasks/:type', function(req, res) {
        db.collection('tasks').remove({
            'type': req.params.type
        }, function(err, result) {
            assert.equal(err, null);
            res.send("OK");
        });
    });
}

function initDeleteTaskByIdEndpoint(db) {
    app.delete('/tasks/:type/:id', function(req, res) {
        db.collection('tasks', function(err, collection) {
            assert.equal(err, null);
            collection.remove({
                '_id': new mongodb.ObjectID(req.params.id)
            }, function(err, result) {
                assert.equal(err, null);
                res.send("OK");
            });
        });
    });
}

function initEndpoints() {
    mongo.connectToServer(function(err) {
        assert.equal(err, null);
        var db = mongo.getDb();

        initGetTasksByTypeEndpoint(db);
        initAddNewTaskEndpoint(db);
        initGetTasksByQuadrantEndpoint(db);
        initDeleteTasksByTypeEndpoint(db);
        initDeleteTaskByIdEndpoint(db);
    });
}

initEndpoints();
var server = app.listen(props.get("server:port"), function() {
    console.log("listening on port ".concat(props.get("server:port")));
});

module.exports = server;
