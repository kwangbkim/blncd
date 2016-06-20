var repository = require('./tasks-repository');

module.exports = function(key, description, callback) {
	var a = description.split(" ");
	var quadrant = a[a.length - 1];
	if (!isNaN(quadrant)) {
		quadrant = parseInt(quadrant);
		description = description.replace(quadrant, '');
	} else {
		quadrant = 4;
	}

	repository.insert({
		key: key,
		type: a[1].trim(),
		description: description.trim(),
		quadrant: quadrant
	}, callback);
}