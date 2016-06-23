const repository = require('./tasks-repository');
const fuzzy = require('./fuzzy-match');

module.exports = function(key, description, callback) {
  const type = description.split(' ')[1];
  if (type) {
    fuzzy.search(key, type, 'type', function(tasks) {
      if (tasks.length > 0) {
        const bestMatch = tasks[0];
        repository.getTasksByType(key, bestMatch.type, callback);
      } else {
        console.log("no type match found for user " + key + ", type " + type);
        callback(null, []);
      }
    });
  } else {
    repository.getAllTasks(key, callback);
  }
}