var fuse = require('./fuse'),
  Task = require('./tasks'),
  assert = require('assert');

function search(input, callback) {
  var options = {
    keys: ['description']
  };

  Task.find({}, function (err, tasks) {
    var f = new fuse(tasks, options);
    var result = f.search(input);
    callback(result);
  });
}

module.exports.search = search;
