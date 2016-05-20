var classify = require('./intent-classifier'),
  sendMail = require('./send-mail'),
  add = require('./add-task'),
  deleteTasksByType = require('./delete-tasks-type'),
  deleteSingleTask = require('./delete-single-task'),
  get = require('./get-tasks');

var commands = {
  'delete single': deleteSingleTask,
  'delete type': deleteTasksByType,
  'add': add,
  'get': get,
  'mail': sendMail
}

module.exports = function(sentence, callback) {
  var description = sentence.substring(sentence.indexOf(' '));
  var intent = classify(sentence.split(" ")[0]);

  var command = commands[intent];
  if (command)
    command(description, callback);
  else
    callback('cant classify intent for: ' + sentence.split(" ")[0], null);
};