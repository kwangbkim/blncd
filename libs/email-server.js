var mailin = require('mailin'),
  balancedRequest = require('./balanced-request');

mailin.start({
  port: 25,
  disableWebhook: true // Disable the webhook posting.
});

mailin.on('authorizeUser', function (connection, username, password, done) {
  if (username == "johnsmith" && password == "mysecret") {
    done(null, true);
  } else {
    done(new Error("Unauthorized!"), false);
  }
});

mailin.on('message', function (connection, data, content) {
  console.log(data);
  var sentence = data.text.split("\n")[0];
  console.log('sentence: ' + sentence);
  var first = sentence.split(" ")[0];
  console.log('first: ' + first);
  if (first != 'note') {
    balancedRequest(sentence, function (err, res) {
      if (err) console.log(err);
      if (res) console.log(res);
    });
  }
});
