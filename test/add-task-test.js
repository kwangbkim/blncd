var assert = require('assert'),
	proxyquire = require('proxyquire'),
	repositoryStub = {};

var stubs = {
  './tasks-repository': {
    'insert': function(type, description, quadrant, callback) {
      callback(type, description, quadrant);
    },
    '@global': true
  }
};

var add = proxyquire('../libs/add-task', stubs);

describe('add-task', function() {
	it('should trim type field', function(done) {
		add("add type has whitespace", function(type, description, quadrant) {
			assert.equal("type", type);
			done();
		});
	});
});

describe('add-task', function() {
	it('should trim description field', function(done) {
		add(" type has whitespace ", function(type, description, quadrant) {
			assert.equal("type has whitespace", description);
			done();
		});
	});
});

describe('add-task', function() {
	it('should send quadrant as int', function(done) {
		add("type do something 1", function(type, description, quadrant) {
			assert.equal(1, quadrant);
			done();
		});
	});
});

describe('add-task', function() {
	it('should default quadrant to 4 if not a number', function(done) {
		add("type do something", function(type, description, quadrant) {
			assert.equal(4, quadrant);
			done();
		});
	});
});