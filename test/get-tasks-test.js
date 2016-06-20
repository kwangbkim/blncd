var assert = require('assert'),
	proxyquire = require('proxyquire');

var stubs = {
	'./tasks-repository': {
		'getTasksByType': function(key, type, callback) {
			callback(type);
		},
		'getAllTasks': function(key, callback) {
			callback('get all tasks');
		}
	},
	'./fuzzy-match': {
		'search': function(key, type, field, callback) {
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
		get("key", "get", function(result) {
			assert.equal("get all tasks", result);
			done();
		});
	});

	it('get tasks of a specific type using fuzzy match', function(done) {
		get("key", "get test", function(res) {
			assert.equal('test', res);
			done();
		});
	});

	it('returns empty list when no task found matching a type', function(done) {
		stubs['./fuzzy-match'].search = function(key, type, field, callback) {
			callback([]);
		};

		get("key", "get test", function(err, res) {
			assert.equal(null, err);
			assert.equal(true, Array.isArray(res));
			assert.equal(0, res.length);
			done();
		});
	});
});