var fuzzy = require('./fuzzy-match'),
    classify = require('./intent-classifier'),
    deleteSingle = require('./delete-single-task'),
    add = require('./add');

module.exports = function (sentence, callback) {
    var description = sentence.substring(sentence.indexOf(' '));
    var intent = classify(sentence);

    if (intent == 'delete single') {
        console.log("starting fuzzy");
        fuzzy.search(description, function (tasks) {
            if (tasks[0]) {
                var bestMatch = tasks[0];
                console.log('attemping to delete: ' + bestMatch);
                deleteSingle(bestMatch._id.toString(), callback);
            } else {
                console.log("no match");
            }
        });
    } else if (intent == 'add') {
        var a = description.split(" ");
        var quadrant = a[a.length - 1];
        console.log(a);
        add(a[1], description, quadrant, callback);
    }
}
