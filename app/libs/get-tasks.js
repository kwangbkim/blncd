var repository = require('./tasks-repository'),
  fuzzy = require('./fuzzy-match');

module.exports = function(description, callback) {
  var type = description.split(' ')[1];
  if (type) {
    fuzzy.search(type, 'type', function(tasks) {
      if (tasks.length > 0) {
        var bestMatch = tasks[0];
        repository.getTasksByType(bestMatch.type, callback);
      } else {
        callback("no match found for type: " + description, null);
      }
    });
  } else {
    repository.getAllTasks(callback);
  }
}