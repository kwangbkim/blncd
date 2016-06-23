const nconf = require('nconf');

nconf.argv()
  .env()
  .file({
    file: './config.json'
  });

module.exports = {
  get: function (name) {
    return nconf.get(name);
  }
};
