var request = require('request'),
    assert  = require('assert'),
    props   = require('./properties.js');

module.exports.execute = execute;

function execute(taskType, callback) {
  var headers = {
      'Content-Type': 'application/json'
  };

  var options = {
    url: 'http://localhost:' + props.get('server:port') + '/tasks/' + taskType,
    method: 'GET'
  };

  request(options, function(err, res, body) {
    assert.equal(err, null);
    callback(JSON.stringify(JSON.parse(body), null, 2));
  });
}

execute(process.argv[2], console.log);
