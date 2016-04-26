var request = require('request'),
    assert = require('assert'),
    props = require('./properties'),
    sf = require('./string-format');

sf.init();

function getQuadrant(quadrant, callback) {
    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        url: "http://{0}:{1}/quadrants/{2}".format(
            props.get('BALANCED_SERVER'),
            props.get('server:port'),
            quadrant),
        method: 'GET'
    };

    request(options, function(err, res, body) {
        assert.equal(err, null);
        var result = JSON.stringify(JSON.parse(body), null, 2);
        callback(result);
    });
}

getQuadrant(process.argv[2], console.log);

module.exports.getQuadrant = getQuadrant;
