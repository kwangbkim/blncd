var request = require('./balanced-request');
var props = require('./properties');

var ask = process.argv.slice(2).join(' ');

request(props.get('BLNCD_API_KEY'), ask, function(err, res) {
	newline();
	if (err) console.log(err);

	if (ask.indexOf('get') >= 0) {
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