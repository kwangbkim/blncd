const classify = require('./intent-classifier');
const sendMail = require('./send-mail');
const add = require('./add-task');
const deleteTasksByType = require('./delete-tasks-type');
const deleteSingleTask = require('./delete-single-task');
const get = require('./get-tasks');
const log = require('./log');

const commands = {
  'delete single': deleteSingleTask,
  'delete type': deleteTasksByType,
  'add': add,
  'get': get,
  'mail': sendMail
}

module.exports = function(key, sentence, callback) {
  const description = sentence.substring(sentence.indexOf(' '));
  const intent = classify(sentence.split(" ")[0]);

  const command = commands[intent];
  if (command) {
    command(key, description, callback);
    log.log('info', 'finished %s command for key %s', intent, key);
  }
  else
    return callback('cant classify intent for: ' + sentence.split(" ")[0], null);
};