var request = require('request'),
    assert = require('assert'),
    props = require('./properties.js'),
    sf = require('./string-format');

sf.init();

function execute(taskType, callback) {
    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        url: "http://{0}:{1}/tasks/{2}".format(
            props.get("BALANCED_SERVER"),
            props.get('server:port'),
            taskType),
        method: 'GET'
    };

    request(options, function(err, res, body) {
        assert.equal(err, null);
        callback(JSON.stringify(JSON.parse(body), null, 2));
    });
}

execute(process.argv[2], console.log);

module.exports.execute = execute;
