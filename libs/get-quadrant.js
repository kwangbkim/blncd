var request = require('request'),
    assert  = require('assert'),
    props   = require('./properties.js');

module.exports.getQuadrant = getQuadrant;

function getQuadrant(quadrant, callback) {
  var headers = {
      'Content-Type': 'application/json'
  };

  var options = {
    url: 'http://localhost:' + props.get('server:port') + '/quadrants/' + quadrant,
    method: 'GET'
  };

  request(options, function(err, res, body) {
    assert.equal(err, null);
    var result = JSON.stringify(JSON.parse(body), null, 2);
    callback(result);
  });
}

getQuadrant(process.argv[2], console.log);
