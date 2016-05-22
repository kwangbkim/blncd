var request = require('./balanced-request');

var ask = process.argv.slice(2).join(' ');

request(ask, function(err, res) {
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
	}
});