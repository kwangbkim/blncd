const mailin = require('mailin');
const balancedRequest = require('./libs/balanced-request');
const sendMail = require('./libs/send-mail');
const intentClassifier = require('./libs/intent-classifier');
const usersRepository = require('./libs/users-repository');
require('./libs/mongo-init');

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
      if (first !== 'note') {
        const command = intentClassifier(first);
        if (command === 'get') {
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