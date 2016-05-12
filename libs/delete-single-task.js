var repository = require('./tasks-repository'),
  fuzzy = require('./fuzzy-match');

module.exports = function(description, callback) {
  console.log("running delete single");
  fuzzy.search(description, 'description', function(tasks) {
    if (tasks[0]) {
      var bestMatch = tasks[0];
      console.log('attemping to delete: ' + bestMatch);
      repository.deleteSingle(bestMatch._id.toString(), callback);
    } else {
      callback("no match found", null);
    }
  });
}