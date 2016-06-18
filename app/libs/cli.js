var blncdRequest = require('./balanced-request');
var request = require('request');
var props = require('./properties');
var sf = require('./string-format');
var readline = require('readline');

sf.init();

var ask = process.argv.slice(2).join(' ');

if (ask == 'create') {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('Email integration is optional.  Type it here or just enter to skip: ', function(answer) {
		var headers = {
			'Content-Type': 'application/json'
		};

		var url = "http://blncd.io/api/users"

		var body = answer != null ? {
			email: answer
		} : null;

		var options = {
			url: url,
			method: 'POST',
			json: true,
			body: body
		};

		request(options, function(err, res, body) {
			if (err) console.log(err);
			if (!err) {
				newline();
				console.log(JSON.stringify(body, null, 2));
				newline();
				console.log("Api key created.  Create the below environment variable and you're all set:");
				console.log("export BLNCD_API_KEY=" + body.key);
				newline();
			}
			rl.close();
		});
	});
} else {
	blncdRequest(props.get('BLNCD_API_KEY'), ask, function(err, res) {
		if (err) console.log(err);

		if (ask.indexOf('get') >= 0) {
			newline();
			var quadrant;
			var filter = function(task) {
				return task.quadrant == quadrant;
			}

			var tasks = [];
			for (var i in res.body) {
				var task = res.body[i];
				tasks.push(task);
			}

			for (quadrant = 1; quadrant <= 4; quadrant++) {
				var t = tasks.filter(filter);
				if (t.length > 0) {
					printQuadrant(quadrant);
					printTasks(t);
					newline();
				}
			}
		} else if (!err) {
			console.log("ok");
		}
	});
}

function printQuadrant(quadrant) {
	if (quadrant == 1)
		console.log("-------- Important & Urgent --------");
	if (quadrant == 2)
		console.log("-------- Important & Not Urgent --------");
	if (quadrant == 3)
		console.log("-------- Not Important & Urgent --------");
	if (quadrant == 4)
		console.log("-------- Not Imporant & Not Urgent --------");
}

function printTasks(tasks) {
	tasks.map(function(item) {
		console.log(item.description);
	});
}

function newline() {
	console.log("");
}