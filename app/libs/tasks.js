var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('tasks', {
	key: String,
  type: String,
  description: String,
  quadrant: Number,
  date: {
    type: Date,
    default: Date.now
  }
});
