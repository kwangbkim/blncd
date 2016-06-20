var fuse = require('./fuse');
var tasksRepository = require('./tasks-repository');
var assert = require('assert');

function search(key, input, field, callback) {
  var options = {
    keys: [field]
  };

  tasksRepository.getAllTasks(key, function (err, tasks) {
    var f = new fuse(tasks, options);
    var result = f.search(input);
    callback(result);
  });
}

module.exports.search = search;
