var props = require('./properties.js'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

module.exports = mongoose.model('tasks', {
  type: String,
  description: String,
  quadrant: Number,
  date: {
    type: Date,
    default: Date.now
  }
});
