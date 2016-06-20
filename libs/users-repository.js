var User = require('./user');
var mongoose = require('mongoose');
var hat = require('hat');

module.exports = {
  getByEmail: getByEmail,

  getByKey: function(key, callback) {
    User.findOne({
      key: key
    }, callback);
  },

  insert: function(email, callback) {
    getByEmail(email, function(err, user) {
      if (err) callback(err, user);
      if (!user) {
        var key = hat();
        var user = new User({
          key: key,
          email: email
        });
        user.save(callback);
      } else {
        callback("user already exists with email: " + email, null);
      }
    });
  },

  update: function(key, email, callback) {
    User.findOne({
      key: key
    }, function(err, user) {
      if (user) {
        user.email = email;
        user.save();
      }
      callback(err, user);
    });
  }
};

function getByEmail(email, callback) {
  User.findOne({
    email: email
  }, callback);
}