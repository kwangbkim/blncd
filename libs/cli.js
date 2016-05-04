var request = require('./balanced-request');

var cleanedRequest = process.argv[2].replace(/['"]+/g, '');
request(cleanedRequest, function (err, res) {
  if (err) console.log(err);
  console.log(res.body);
});
