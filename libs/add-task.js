const repository = require('./tasks-repository');

module.exports = function(key, description, callback) {
	const tokenizedAsk = description.split(" ");
	let quadrant = tokenizedAsk[tokenizedAsk.length - 1];
	if (!isNaN(quadrant)) {
		quadrant = parseInt(quadrant);
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