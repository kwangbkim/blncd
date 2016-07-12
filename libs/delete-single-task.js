const repository = require('./tasks-repository');
const fuzzy = require('./fuzzy-match');

module.exports = function(key, description, callback) {
  console.log('delete single task');
  fuzzy.search(key, description, 'description', function(tasks) {
    if (tasks[0]) {
      const bestMatch = tasks[0];
      repository.deleteSingle(bestMatch._id.toString(), callback);
    } else {
      callback("cant delete single task for description: " + description, null);
    }
  });
}