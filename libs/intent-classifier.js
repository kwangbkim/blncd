var fuse = require('./fuse');

var deletes = ['done', 'finish', 'complete', 'delete'];
var adds = ['add', 'new'];

module.exports = function (sentence) {
    var split = sentence.split(" ");
    var first = split[0];
    var second = split[1];

    var f = new fuse(deletes);
    var result = f.search(first);
    if (first != 'new' && first.length > 2) {
        if (result.length >= 1 && second == 'all')
            return "delete all";
        else if (result.length >= 1)
            return "delete";
    }

    f = new fuse(adds);
    result = f.search(first);
    if (result.length >= 1)
        return "add";
    return null;
}
