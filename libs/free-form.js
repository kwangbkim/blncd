var fuzzy = require('./fuzzy-match'),
  classify = require('./intent-classifier'),
  repository = require('./tasks-repository'),
  sendMail = require('./send-mail');

module.exports = function (sentence, callback) {
  var description = sentence.substring(sentence.indexOf(' '));
  var intent = classify(sentence.split(" ")[0]);

  if (intent == 'delete single') {
    console.log("running delete single");
    fuzzy.search(description, function (tasks) {
      if (tasks[0]) {
        var bestMatch = tasks[0];
        console.log('attemping to delete: ' + bestMatch);
        repository.deleteSingle(bestMatch._id.toString(), callback);
      } else {
        console.log("no match");
      }
    });
  } else if (intent == 'add') {
    console.log('running add');
    var a = description.split(" ");
    var quadrant = a[a.length - 1];
    console.log(a);
    repository.insert(a[1].trim(), description.trim(), quadrant, callback);
  } else if (intent == 'get') {
    console.log('running get');
    repository.getAllTasks(callback);
  } else if (intent == 'mail') {
    console.log('running mail');
    sendMail(callback);
  } else {
    callback('no task found for intent: ' + intent, null);
  }
}
