var request = require('request'),
    assert = require('assert'),
    props = require('./properties'),
    sf = require('./string-format');

sf.init();

function deleteSingle(id, callback) {
    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        url: "http://{0}:{1}/tasks/{2}".format(
            props.get("BALANCED_SERVER"),
            props.get('server:port'),
            id),
        method: 'DELETE'
    };

    request(options, function(err, res, body) {
        callback(err, res);
    });
}

module.exports = deleteSingle;
