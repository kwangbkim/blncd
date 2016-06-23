const Task = require('./tasks');
const mongoose = require('mongoose');

module.exports = {
  deleteByType: function(key, type, callback) {
    Task.find({
      key: key,
      type: type
    }).remove(callback);
  },

  deleteSingle: function(id, callback) {
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
    const taskToSave = new Task({
      key: task.key,
      description: task.description,
      quadrant: task.quadrant,
      type: task.type
    });
    taskToSave.save(callback);
  }
};