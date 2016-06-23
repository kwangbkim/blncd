const fuse = require('./fuse');
const tasksRepository = require('./tasks-repository');
const assert = require('assert');

function search(key, input, field, callback) {
  const options = {
    keys: [field]
  };

  tasksRepository.getAllTasks(key, function (err, tasks) {
    const f = new fuse(tasks, options);
    const result = f.search(input);
    callback(result);
  });
}

module.exports.search = search;
