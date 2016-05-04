var request = require('request'),
    props = require('./properties'),
    sf = format = require('./string-format');

sf.init();

var headers = {
    'Content-Type': 'application/json'
};

console.log(process.argv[2]);

var options = {
    url: "http://{0}:{1}/requests".format(
            props.get('BALANCED_SERVER'),
            props.get('server:port')),
    method: 'POST',
    json: true,
    body: {
        ask: process.argv[2].replace(/['"]+/g, '')
    }
};

request(options, function(err, res, body) {
    if (err) console.log(err);
    console.log(res.body);
});
