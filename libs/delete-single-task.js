var request = require('request'),
    assert = require('assert'),
    props = require('./properties'),
    sf = require('./string-format');

sf.init();

var headers = {
    'Content-Type': 'application/json'
};

var options = {
    url: "http://{0}:{1}/tasks/{2}/{3}".format(
        props.get("BALANCED_SERVER"),
        props.get('server:port'),
        process.argv[2],
        process.argv[3]),
    method: 'DELETE'
};

request(options, function(err, res, body) {
    assert.equal(err, null);
    console.log(body);
});
