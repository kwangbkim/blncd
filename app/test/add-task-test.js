var assert = require('assert'),
	proxyquire = require('proxyquire');

var stubs = {
	'./tasks-repository': {
		'insert': function(task, callback) {
			callback(task.key, task.type, task.description, task.quadrant);
		}
	}
};

var add = proxyquire('../libs/add-task', stubs);

describe('add-task', function() {
	it('should trim type field', function(done) {
		add("key", "add type has whitespace", function(key, type, description, quadrant) {
			assert.equal("type", type);
			done();
		});
	});

	it('should trim description field', function(done) {
		add("key", " type has whitespace ", function(key, type, description, quadrant) {
			assert.equal("type has whitespace", description);
			done();
		});
	});

	it('should send quadrant as int', function(done) {
		add("key", "type do something 1", function(key, type, description, quadrant) {
			assert.equal(1, quadrant);
			done();
		});
	});

	it('should default quadrant to 4 if not a number', function(done) {
		add("key", "type do something", function(key, type, description, quadrant) {
			assert.equal(4, quadrant);
			done();
		});
	});

	it('should remove quadrant quadrant from description', function(done) {
		add("key", "type do something 4", function(key, type, description, quadrant) {
			assert.equal('type do something', description);
			done();
		});
	});
});