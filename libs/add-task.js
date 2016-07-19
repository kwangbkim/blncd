const repository = require('./tasks-repository');
const log = require('./log');

module.exports = function(key, description, callback) {
	log.log('info', 'adding task for key: %s, desc: %s', key, description);
	const tokenizedAsk = description.split(" ");
	let quadrant = tokenizedAsk[tokenizedAsk.length - 1];
	if (!isNaN(quadrant)) {
		quadrant = parseInt(quadrant, 10);
		description = description.replace(quadrant, '');
	} else {
		quadrant = 4;
	}

	repository.insert({
		key: key,
		type: tokenizedAsk[1].trim(),
		description: description.trim(),
		quadrant: quadrant
	}, callback);
}