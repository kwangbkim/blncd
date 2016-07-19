const fuse = require('./fuse');
const tasksRepository = require('./tasks-repository');
const assert = require('assert');
const log = require('./log');

function search(key, input, field, callback) {
  const options = {
    keys: [field]
  };

  tasksRepository.getAllTasks(key, function (err, tasks) {
    log.log('info', 'fuzzy search for key: %s, input: %s, field: %s', key, input, field);
    const f = new fuse(tasks, options);
    const result = f.search(input);
    log.info('finished fuzzy search for key %s', key);
    callback(result);
  });
}

module.exports.search = search;
