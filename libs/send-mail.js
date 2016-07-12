const props = require('./properties');
const repository = require('./tasks-repository');
const jsrender = require('jsrender');
const sendgrid = require('sendgrid')(props.get('SENDGRID'));
const usersRepository = require('./users-repository');

function mail(key, description, callback) {
  const send = function(err, tasks) {
    usersRepository.getByKey(key, function(err, user) {
      if (err) callback(err, user);
      if (!user) {
        callback("no user found for key:" + key, null);
      } else if (!user.email) {
        callback("email has not been setup yet.  you can send a PUT request to update your email");
      } else {
        if (tasks && tasks.length > 0) {
          const template = jsrender.templates('{{:description}}<br/>');
          sendgrid.send({
            to: user.email,
            from: props.get('BALANCED_SERVER_EMAIL'),
            subject: "blncd",
            html: template.render(tasks)
          }, function(err, json) {
            callback(err, json);
          });
        }
      }
    });
  };

  const type = description.split(' ')[1];
  if (type) {
    repository.getTasksByType(key, type, send);
  } else {
    repository.getAllTasks(key, send);
  }
}

module.exports = mail;