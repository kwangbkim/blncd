var repository = require('./tasks-repository');

module.exports = function (description, callback) {
  var a = description.split(" ");
  var quadrant = a[a.length - 1];
  console.log(a);
  repository.insert(a[1].trim(), description.trim(), quadrant, callback);
}
