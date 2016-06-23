const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('users', {
	key: String,
	email: String
});