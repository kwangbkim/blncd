var fuse = require('./fuse')

var lists = {
    'add': ['add', 'new'],
    'get': ['get'],
    'mail': ['send', 'mail', 'email'],
    'delete single': ['done', 'complete', 'delete'],
    'delete type': ['finish', 'finished'],
}

var commands = [
    'add', 'get', 'what', 'retrieve', 'send', 'mail', 'email',
    'done', 'complete', 'delete', 'finish', 'finished', 'find', 'new'
]

module.exports = function (word) {
    var f = new fuse(commands);
    var matches = f.search(word);

    console.log('matched commands');
    for (var i in matches) {
        console.log(commands[matches[i]]);
    }

    for (var k in lists) {
        if (lists[k].indexOf(commands[matches[0]]) > -1) {
            console.log('best intent match: ' + k);
            return k;
        }
    }
    return null;
}
