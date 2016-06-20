var repository = require('./tasks-repository');
var fuzzy = require('./fuzzy-match');

module.exports = function(key, description, callback) {
  var type = description.split(' ')[1];
  if (type) {
    fuzzy.search(key, type, 'type', function(tasks) {
      if (tasks.length > 0) {
        var bestMatch = tasks[0];
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