const User = require('./user');
const mongoose = require('mongoose');
const hat = require('hat');
const tasksRepository = require('./tasks-repository');

module.exports = {
  getByEmail: getByEmail,

  delete: function(key, callback) {
    getByKey(key, function(err, user) {
      if (user) {
        user.remove();
        tasksRepository.deleteByKey(key, callback);
      }
      callback(err, user);
    });
  },

  getByKey: getByKey,

  insert: function(email, callback) {
    const createAndSave = () => {
      const key = hat();
      const user = new User({
        key: key,
        email: email
      });
      user.save(callback);
    };

    if (!email) {
      createAndSave();
    } else {
      getByEmail(email, (err, user) => {
        if (err) callback(err, user);
        if (!user) {
          createAndSave();
        } else {
          callback("user already exists with email: " + email, null);
        }
      });
    }
  },

  update: function(key, email, callback) {
    User.findOne({
      key: key
    }, (err, user) => {
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

function getByKey(key, callback) {
  User.findOne({
    key: key
  }, callback);
}