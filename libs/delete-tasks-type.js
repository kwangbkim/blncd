var request = require('request'),
  assert = require('assert'),
  props = require('./properties.js'),
  sf = require('./string-format');

sf.init();

module.exports = function () {
  var headers = {
    'Content-Type': 'application/json'
  };

  var options = {
    url: "http://{0}:{1}/tasks/{2}".format(
      props.get('server:port'),
      process.argv[2]),
    method: 'DELETE'
  };

  request(options, function (err, res, body) {
    assert.equal(err, null);
    console.log(body);
  });
}
