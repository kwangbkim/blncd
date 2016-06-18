var request = require('request');
var readline = require('readline');

var ask = process.argv.slice(2).join(' ');
var apiKey = process.env.BLNCD_API_KEY;
if (!apiKey)
	console.log("\nCan't find an api key, let's get you set up!");

if (ask == 'create' || !apiKey) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('\nEmail integration is optional.\nType it here or just enter to skip: ', function(answer) {
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
				console.log("For a how-to just type: blncd help");
				newline();
			}
			rl.close();
		});
	});
} else if (ask == 'help') {
	newline();
	console.log("* Get the current list of tasks.");
	console.log("blncd get");

	newline();
	console.log("* Here's how to add stuff.  Keywords [add | new] will both work.");
	console.log("blncd add buy medicine is important & urgent 1");
	console.log("blncd add read a nodejs book is important but not urgent 2");
	console.log("blncd add pickup laundry is not important & urgent 3");
	console.log("blncd add buy a basketball is not important & not urgent 4");
	console.log("blncd add not specifying a priority defaults to not important & not urgent");
	newline();

	console.log("* Here's how to mark something done.  Blncd will do a fuzzy match to find the most appropriate item you're referring to.  Keywords [done | complete | delete] will all work.");
	console.log("blncd done medicine");
	console.log("blncd done nodejs")
	newline();

	console.log("* The first word in each task is noted as the tasks 'type'.  You can get all tasks of the same type by specifying it after 'get'.  You can complete multiple tasks at the same time using the 'finish[ed]' keyword.");
	console.log("blncd add buy apples");
	console.log("blncd add buy oranges");
	console.log("blncd add buy toothpaste");
	console.log("blncd add buy cereal");
	console.log("blncd get buy");
	console.log("blncd finish buy");
	newline();

	console.log("* Mail yourself the current task list.  Keywords [send | mail | email] will all work.");
	console.log("blncd mail");
	newline();
} else {
	call(apiKey, ask, function(err, res) {
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

function call(key, ask, callback) {
	var headers = {
		'Content-Type': 'application/json'
	};

	var url = "http://blncd.io/api/requests";

	var options = {
		url: url,
		method: 'POST',
		json: true,
		body: {
			ask: ask,
			key: key
		}
	};

	request(options, function(err, res, body) {
		callback(err, res);
	});
}