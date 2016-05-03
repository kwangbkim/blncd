var props = require('./properties'),
    get = require('./get-tasks'),
    sendgrid = require('sendgrid')(props.get('SENDGRID'));

function mail() {
    get(function (body) {
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

mail();
