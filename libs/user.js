var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('users', {
	key: String,
	email: String
});