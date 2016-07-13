const fuse = require('./fuse');

const lists = {
  'add': ['add', 'new'],
  'get': ['get'],
  'mail': ['send', 'mail', 'email'],
  'delete single': ['done', 'complete', 'delete'],
  'delete type': ['finish', 'finished']
};

const commands = [
  'add', 'new', 'get', 'send', 'mail', 'email',
  'done', 'complete', 'delete', 'finish', 'finished', 'find'
];

module.exports = function (word) {
  const f = new fuse(commands);
  const matches = f.search(word);

  for (const k in lists) {
    if (lists[k].indexOf(commands[matches[0]]) > -1) {
      return k;
    }
  }
  return null;
};
