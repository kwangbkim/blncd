var props = require('./properties');
var repository = require('./tasks-repository');
var jsrender = require('jsrender');
var sendgrid = require('sendgrid')(props.get('SENDGRID'));
var usersRepository = require('./users-repository');

function mail(key, description, callback) {
  var send = function(err, tasks) {
    usersRepository.getByKey(key, function(err, user) {
      if (err) callback(err, user);
      if (!user) {
        callback("no user found for key:" + key, null);
      } else {
        if (tasks) {
          var template = jsrender.templates('{{:description}}<br/>');
          sendgrid.send({
            to: user.email,
            from: props.get('BALANCED_SERVER_EMAIL'),
            subject: "Balanced",
            html: template.render(tasks)
          }, function(err, json) {
            callback(err, json);
          });
        }
      }
    });
  };

  var type = description.split(' ')[1];
  if (type) {
    repository.getTasksByType(key, type, send);
  } else {
    repository.getAllTasks(key, send);
  }
}

module.exports = mail;