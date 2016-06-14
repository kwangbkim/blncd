var request = require('./balanced-request');

var ask = process.argv.slice(3).join(' ');
var key = process.argv[2];

request(key, ask, function(err, res) {
	if (err) console.log(err);

	if (ask.indexOf('get') >= 0) {
		console.log('\n--- tasks ---');
		var tasks = [];
		
		for (var i in res.body) {
			var task = res.body[i];
			tasks.push(task.description);
		}
		tasks.map(function(item) {
			console.log(item);
		});
		console.log('--- ---\n');
	} else if (!err) {
		console.log("ok");
	}
});