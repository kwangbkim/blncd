var props = require('./properties'),
    repository = require('./tasks-repository'),
    sendgrid = require('sendgrid')(props.get('SENDGRID'));

function mail() {
    repository.getAllTasks(function (err, body) {
        if (body) {
            sendgrid.send({
                to: props.get('user:email'),
                from: props.get('user:email'),
                subject: "Urgent",
                text: body
            }, function(err, json) {
                if (err) return console.error(err);
                console.log(json);
            });
        }
    });
}

module.exports = mail;
