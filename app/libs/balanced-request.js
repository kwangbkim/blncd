var request = require('request'),
  sf = require('./string-format'),
  props = require('./properties');

sf.init();

function call(key, ask, callback) {
  var headers = {
    'Content-Type': 'application/json'
  };

  var url = "http://{0}:{1}/requests".format(
      props.get('BALANCED_SERVER'),
      props.get('server:port'));
  
  var options = {
    url: url,
    method: 'POST',
    json: true,
    body: {
      ask: ask,
      key: key
    }
  };

  request(options, function (err, res, body) {
    callback(err, res);
  });
}

module.exports = call;
