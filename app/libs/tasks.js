var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('tasks', {
  type: String,
  description: String,
  quadrant: Number,
  date: {
    type: Date,
    default: Date.now
  }
});
