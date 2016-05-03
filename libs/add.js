var request = require('request'),
    assert = require('assert'),
    props = require('./properties'),
    sf = format = require('./string-format');

sf.init();

function add(type, desc, quadrant, callback) {
    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        url: "http://{0}:{1}/tasks".format(props.get('BALANCED_SERVER'), props.get('server:port')),
        method: 'POST',
        json: true,
        body: {
            type: type,
            description: desc,
            quadrant: parseInt(quadrant)
        }
    };

    request(options, function(err, res, body) {
        assert.equal(err, null);
        console.log(body);
        callback(res);
    });
}

module.exports = add;
