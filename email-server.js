const log = require('./libs/log')
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
  log.info('received request from %s: %s ', email, sentence);

  usersRepository.getByEmail(email, function(err, user) {
    if (err) log.error(err);
    if (user) {
      const first = sentence.split(" ")[0];
      if (first !== 'note') {
        const command = intentClassifier(first);
        if (command === 'get') {
          sentence = sentence.replace('get', 'mail');
        }
        balancedRequest(user.key, sentence, function(err, res) {
          if (err) log.error(err);
          if (res) log.info(res.body);
        });
      }
    }
  });
});