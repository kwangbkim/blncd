var repository = require('./tasks-repository');

module.exports = function (description, callback) {
  var a = description.split(" ");
  var quadrant = a[a.length - 1];
  if (!isNaN(quadrant)) {
  	quadrant = parseInt(quadrant);	
  	description = description.replace(quadrant, '');
  } else {
  	quadrant = 4;
  }
  
  repository.insert(a[1].trim(), description.trim(), quadrant, callback);
}
