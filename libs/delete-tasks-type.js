const repository = require('./tasks-repository');
const fuzzy = require('./fuzzy-match');

module.exports = function(key, description, callback) {
	console.log('delete by type');
	fuzzy.search(key, description, 'type', function(tasks) {
		if (tasks[0]) {
			const bestMatch = tasks[0];
			repository.deleteByType(key, bestMatch.type, callback);
		} else {
			callback("no match found for type: " + description, null);
		}
	});
};