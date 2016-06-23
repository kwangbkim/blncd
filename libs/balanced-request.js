const request = require('request');

function call(key, ask, callback) {
  const headers = {
    'Content-Type': 'application/json'
  };

  const url = "http://blncd.io/api/requests";
  
  const options = {
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
