var Task = require('./tasks'),
  mongoose = require('mongoose');

module.exports = {
  deleteByType: function(type, callback) {
    Task.find({
      type: type
    }).remove(callback);
  },

  deleteSingle: function(id, callback) {
    Task.findOne({
      _id: mongoose.Types.ObjectId(id)
    }, function(err, task) {
      var isDeleted = false;
      if (task) {
        task.remove();
      }
      callback(err, task);
    });
  },

  getAllTasks: function(callback) {
    Task.find({}).sort('quadrant').exec(callback);
  },

  getTasksByQuadrant: function(quadrant, callback) {
    Task.find({
      quadrant: parseInt(quadrant)
    }, callback);
  },
  
  getTasksByType: function(type, callback) {
    Task.find({
      type: type
    }).sort('quadrant').exec(callback);
  },

  insert: function(type, description, quadrant, callback) {
    var task = new Task({
      description: description,
      quadrant: quadrant,
      type: type
    });
    task.save(callback);
  }
};