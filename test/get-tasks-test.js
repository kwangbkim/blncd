var assert = require('assert'),
	proxyquire = require('proxyquire');

var stubs = {
	'./tasks-repository': {
		'getTasksByType': function(type, callback) {
			callback(type);
		},
		'getAllTasks': function(callback) {
			callback('get all tasks');
		}
	},
	'./fuzzy-match': {
		'search': function(type, field, callback) {
			var task = {
				type: type
			};
			callback([task]);
		}
	}
};

var get = proxyquire('../libs/get-tasks', stubs);

describe('get-tasks', function() {
	it('get all tasks when nothing specified after command', function(done) {
		get("get", function(result) {
			assert.equal("get all tasks", result);
			done();
		});
	});

	it('get tasks of a specific type using fuzzy match', function(done) {
		get("get test", function(res) {
			assert.equal('test', res);
			done();
		});
	});

	it('return error when no task found matching a type', function(done) {
		stubs['./fuzzy-match'].search = function(type, field, callback) {
			callback([]);
		};

		get("get test", function(err, res) {
			assert.equal("no match found for type: get test", err);
			assert.equal(null, res);
			done();
		});
	});
});