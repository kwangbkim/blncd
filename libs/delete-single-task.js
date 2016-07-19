const repository = require('./tasks-repository');
const fuzzy = require('./fuzzy-match');
const log = require('./log');

module.exports = function(key, description, callback) {
  log.log('info', 'begin delete single task for key: %s, desc: %s ', key, description);
  fuzzy.search(key, description, 'description', function(tasks) {
    if (tasks[0]) {
      const bestMatch = tasks[0];
      log.log('info', 'deleting task for key %s', key);
      repository.deleteSingle(bestMatch._id.toString(), callback);
    } else {
      callback("cant delete single task for description: " + description, null);
    }
  });
}