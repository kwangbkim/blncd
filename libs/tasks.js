const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
