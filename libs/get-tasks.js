var repository = require('./tasks-repository'),
  fuzzy = require('./fuzzy-match');

module.exports = function(description, callback) {
  var type = description.split(' ')[1];
  if (type) {
    console.log('running get tasks by type');
    fuzzy.search(type, 'type', function(tasks) {
      if (tasks.length > 0) {
        var bestMatch = tasks[0];
        console.log('best match found: ' + bestMatch.type);
        repository.getTasksByType(bestMatch.type, callback);
      } else {
        callback("no match found for type: " + description, null);
      }
    });
  } else {
    console.log('running get all tasks');
    repository.getAllTasks(callback);
  }
}