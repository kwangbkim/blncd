var request = require('request'),
  assert = require('assert'),
  props = require('./properties'),
  sf = require('./string-format');

sf.init();

function add(type, desc, quadrant, callback) {
  var headers = {
    'Content-Type': 'application/json'
  };

  var options = {
    url: "http://{0}:{1}/tasks".format(props.get('BALANCED_SERVER'), props.get('server:port')),
    method: 'POST',
    json: true,
    body: {
      type: type,
      description: desc,
      quadrant: parseInt(quadrant)
    }
  };

  request(options, function (err, res, body) {
    callback(err, res);
  });
}

module.exports = add;
