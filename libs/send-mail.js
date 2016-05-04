var props = require('./properties'),
  repository = require('./tasks-repository'),
  sendgrid = require('sendgrid')(props.get('SENDGRID'));

function mail(callback) {
  repository.getAllTasks(function (err, tasks) {
    if (tasks) {
      sendgrid.send({
        to: props.get('user:email'),
        from: props.get('BALANCED_SERVER_EMAIL'),
        subject: "Balanced",
        text: JSON.stringify(tasks, null, 2)
      }, function (err, json) {
        callback(err, json);
      });
    }
  });
}

module.exports = mail;
