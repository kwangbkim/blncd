var props = require('./properties'),
  repository = require('./tasks-repository'),
  jsrender = require('jsrender') ,
  sendgrid = require('sendgrid')(props.get('SENDGRID'));

function mail(key, description, callback) {
  var send = function(err, tasks) {
    if (tasks) {
      sendgrid.send({
        to: props.get('user:email'),
        from: props.get('BALANCED_SERVER_EMAIL'),
        subject: "Balanced",
        html: jsrender.renderFile('./templates/email-template.html', tasks)
      }, function(err, json) {
        callback(err, json);
      });
    }
  };

  var type = description.split(' ')[1];
  if (type) {
    repository.getTasksByType(key, type, send);
  } else {
    repository.getAllTasks(key, send);
  }
}

module.exports = mail;