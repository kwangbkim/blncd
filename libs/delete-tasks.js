var request = require('request'),
    assert = require('assert'),
    props = require('./properties.js');

var headers = {
    'Content-Type': 'application/json'
};

var options = {
    url: 'http://localhost:' + props.get('server:port') + '/tasks/' + process.argv[2],
    method: 'DELETE'
};

request(options, function(err, res, body) {
    assert.equal(err, null);
    console.log(body);
});
