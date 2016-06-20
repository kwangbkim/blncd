var fuse = require('./fuse');

var lists = {
  'add': ['add', 'new'],
  'get': ['get'],
  'mail': ['send', 'mail', 'email'],
  'delete single': ['done', 'complete', 'delete'],
  'delete type': ['finish', 'finished'],
};

var commands = [
  'add', 'new', 'get', 'send', 'mail', 'email',
  'done', 'complete', 'delete', 'finish', 'finished', 'find',
];

module.exports = function (word) {
  var f = new fuse(commands);
  var matches = f.search(word);

  for (var k in lists) {
    if (lists[k].indexOf(commands[matches[0]]) > -1) {
      return k;
    }
  }
  return null;
};
