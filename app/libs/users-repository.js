var User = require('./user');
var mongoose = require('mongoose');
var hat = require('hat');

module.exports = {
  getByKey: function(key, callback) {
    User.findOne({ key: key }, callback);
  },

  insert: function(email, callback) {
    var key = hat();
    var user = new User({
      key: key,
      email: email
    });
    user.save(callback);
  },

  update: function(key, email, callback) {
    User.findOne({ key: key }, function (err, user) {
      if (user) {
        user.email = email;
        user.save();
      }
      callback(err, user);
    });
  }
};