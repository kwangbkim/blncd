var props     = require('./properties'),
    quadrant  = require('./get-quadrant')
    sendgrid  = require('sendgrid')(props.get('SENDGRID'));

quadrant.getQuadrant("1", sendImportantUrgent);
quadrant.getQuadrant("2", sendImportantNotUrgent);

function sendImportantUrgent(body) {
  if (body) {
    sendgrid.send({
      to:       props.get('user:email'),
      from:     props.get('user:email'),
      subject:  "Urgent",
      text:     body
    }, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
    });
  }
}

function sendImportantNotUrgent(body) {
  if (body) {
    sendgrid.send({
      to:       props.get('user:email'),
      from:     props.get('user:email'),
      subject:  "Not Urgent",
      text:     body
    }, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
    });
  }
}
