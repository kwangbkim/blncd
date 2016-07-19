const Task = require('./tasks');
const mongoose = require('mongoose');
const log = require('./log');

module.exports = {
  deleteByKey: function(key, callback) {
    Task.find({
      key: key
    }).remove(callback);
  },

  deleteByType: function(key, type, callback) {
    Task.find({
      key: key,
      type: type
    }).remove(callback);
  },

  deleteSingle: function(id, callback) {
    log.info('delete single task: ' + id);
    Task.findOne({
      _id: mongoose.Types.ObjectId(id)
    }, function(err, task) {
      if (task) {
        task.remove();
      }
      callback(err, task);
    });
  },

  getAllTasks: function(key, callback) {
    log.info('get all tasks for key: ' + key);
    Task.find({ key: key }).sort('quadrant').exec(callback);
  },

  getTasksByQuadrant: function(key, quadrant, callback) {
    Task.find({
      key: key,
      quadrant: parseInt(quadrant)
    }, callback);
  },
  
  getTasksByType: function(key, type, callback) {
    Task.find({
      key: key,
      type: type
    }).sort('quadrant').exec(callback);
  },

  insert: function(task, callback) {
    log.info('insert a new task for key: ' + task.key);
    const taskToSave = new Task({
      key: task.key,
      description: task.description,
      quadrant: task.quadrant,
      type: task.type
    });
    taskToSave.save(callback);
  }
};