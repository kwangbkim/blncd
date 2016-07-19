const fuse = require('./fuse');
const tasksRepository = require('./tasks-repository');
const assert = require('assert');
const log = require('./log');

function search(key, input, field, callback) {
  const options = {
    keys: [field]
  };

  tasksRepository.getAllTasks(key, function (err, tasks) {
  	log.info('fuzzy search for: ' + key);
    const f = new fuse(tasks, options);
    const result = f.search(input);
    log.info('finished fuzzy search for: ' + key);
    callback(result);
  });
}

module.exports.search = search;
