const mailin = require('mailin');
const balancedRequest = require('./libs/balanced-request');
const sendMail = require('./libs/send-mail');
const intentClassifier = require('./libs/intent-classifier');
const mongoose = require('mongoose');
const usersRepository = require('./libs/users-repository');
const props = require('./libs/properties');

mongoose.connect(props.get("mongo:url")
  .replace('{BALANCED_DB_PASSWORD}', props.get('BALANCED_DB_PASSWORD'))
  .replace('{BALANCED_DB_USER}', props.get('BALANCED_DB_USER')));

mailin.start({
  port: 25,
  disableWebhook: true // Disable the webhook posting.
});

mailin.on('message', function(connection, data, content) {
  const email = data.from[0].address;
  const sentence = data.text.split("\n")[0];
  console.log('received request from %s: %s ', email, sentence);

  usersRepository.getByEmail(email, function(err, user) {
    if (err) console.log(err);
    if (user) {
      const first = sentence.split(" ")[0];
      if (first != 'note') {
        const command = intentClassifier(first);
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