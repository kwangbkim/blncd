var request = require('request'),
    assert = require('assert'),
    props = require('./properties.js'),
    sf = require('./string-format');

sf.init();

function execute(callback) {
    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        url: "http://{0}:{1}/tasks".format(
            props.get("BALANCED_SERVER"),
            props.get('server:port')),
        method: 'GET'
    };

    request(options, function(err, res, body) {
        assert.equal(err, null);
        callback(JSON.stringify(JSON.parse(body), null, 2));
    });
}

module.exports = execute;
