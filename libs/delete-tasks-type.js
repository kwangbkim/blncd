const repository = require('./tasks-repository');
const fuzzy = require('./fuzzy-match');
const log = require('./log')

module.exports = function(key, description, callback) {
	log.log('info', 'delete by type for key: %s, desc: %s', key, description);
	fuzzy.search(key, description, 'type', function(tasks) {
		if (tasks[0]) {
			const bestMatch = tasks[0];
			log.log('info', 'deleting type for key: %s', key);
			repository.deleteByType(key, bestMatch.type, callback);
		} else {
			callback("no match found for type: " + description, null);
		}
	});
};