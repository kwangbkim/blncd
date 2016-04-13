var request = require('request'),
    assert  = require('assert'),
    props   = require('./properties.js');

var headers = {
    'Content-Type': 'application/json'
};

var options = {
  url: 'http://localhost:' + props.get('server:port') + '/tasks',
  method: 'POST',
  json: true,
  body: {
    type: process.argv[2],
    description: process.argv[3],
    quadrant: parseInt(process.argv[4])
  }
};

request(options, function(err, res, body) {
  assert.equal(err, null);
  console.log(body);
});
