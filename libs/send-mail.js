var props = require('./properties'),
  repository = require('./tasks-repository'),
  sendgrid = require('sendgrid')(props.get('SENDGRID'));

function mail(description, callback) {
  var send = function(err, tasks) {
    if (tasks) {
      sendgrid.send({
        to: props.get('user:email'),
        from: props.get('BALANCED_SERVER_EMAIL'),
        subject: "Balanced",
        text: JSON.stringify(tasks, null, 2)
      }, function(err, json) {
        callback(err, json);
      });
    }
  };

  var type = description.split(' ')[1];
  if (type) {
    repository.getTasksByType(type, send);
  } else {
    repository.getAllTasks(send);
  }
}

module.exports = mail;