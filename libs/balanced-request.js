var request = require('request');

function call(key, ask, callback) {
  var headers = {
    'Content-Type': 'application/json'
  };

  var url = "http://blncd.io/api/requests";
  
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
