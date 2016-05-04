var mailin = require('mailin'),
  balancedRequest = require('./balanced-request');

mailin.start({
  port: 25,
  disableWebhook: true // Disable the webhook posting.
});

mailin.on('message', function (connection, data, content) {
  var sentence = data.text.split("\n")[0];
  var first = sentence.split(" ")[0];
  if (first != 'note') {
    balancedRequest(sentence, function (err, res) {
      if (err) console.log(err);
      if (res) console.log(res);
    });
  }
});
