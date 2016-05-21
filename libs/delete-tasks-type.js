var repository = require('./tasks-repository'),
	fuzzy = require('./fuzzy-match');

module.exports = function(description, callback) {
	console.log('delete by type');
	fuzzy.search(description, 'type', function(tasks) {
		if (tasks[0]) {
			var bestMatch = tasks[0];
			repository.deleteByType(bestMatch.type, callback);
		} else {
			callback("no match found for type: " + description, null);
		}
	});
};