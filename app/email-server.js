var mailin = require('mailin');
var balancedRequest = require('./libs/balanced-request');
var sendMail = require('./libs/send-mail');
var intentClassifier = require('./libs/intent-classifier');
var mongoose = require('mongoose');
var usersRepository = require('./libs/users-repository');
var props = require('./libs/properties');

mongoose.connect(props.get("mongo:url")
  .replace('{BALANCED_DB_PASSWORD}', props.get('BALANCED_DB_PASSWORD'))
  .replace('{BALANCED_DB_USER}', props.get('BALANCED_DB_USER')));

mailin.start({
  port: 25,
  disableWebhook: true // Disable the webhook posting.
});

mailin.on('message', function(connection, data, content) {
  var email = data.from[0].address;
  var sentence = data.text.split("\n")[0];
  console.log('received request from %s for %s: ', email, sentence);

  usersRepository.getByEmail(email, function(err, user) {
    if (err) console.log(err);
    if (user) {
      var first = sentence.split(" ")[0];
      if (first != 'note') {
        var command = intentClassifier(first);
        if (command == 'get') {
          sentence = sentence.replace('get', 'mail');
        }
        balancedRequest(user.key, sentence, function(err, res) {
          if (err) console.log(err);
          if (res) console.log(res.body);
        });
      }
    }
  });
});