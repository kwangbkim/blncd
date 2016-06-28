const assert = require('assert');
const proxyquire = require('proxyquire').noPreserveCache();

describe('free-form', function() {
	const stubs = {
		'./send-mail': function(key, description, callback) {
			callback('sent mail');
		},
		'./add-task': function(key, description, callback) {
			callback('added task');
		},
		'./delete-tasks-type': function(key, description, callback) {
			callback('deleted tasks by type');
		},
		'./delete-single-task': function(key, description, callback) {
			callback('deleted single task');
		},
		'./get-tasks': function(key, description, callback) {
			callback('get tasks');
		}
	};
	const ff = proxyquire('../libs/free-form', stubs);

	it('sends mail', function(done) {
		ff("key", "mail", function(result) {
			assert.equal("sent mail", result);
			done();
		});
	});

	it('deletes single task', function(done) {
		ff("key", "delete some task", function(result) {
			assert.equal("deleted single task", result);
			done();
		});
	});

	it('deletes by task type', function(done) {
		ff("key", "finished task-type", function(result) {
			assert.equal("deleted tasks by type", result);
			done();
		});
	});

	it('adds a new task', function(done) {
		ff("key", "add type some new task", function(result) {
			assert.equal("added task", result);
			done();
		});
	});

	it('gets tasks', function(done) {
		ff("key", "get", function(result) {
			assert.equal("get tasks", result);
			done();
		});
	});

	it('returns error when no intent found', function(done) {
		ff("key", "asdf043295hf", function(err, result) {
			assert.equal("cant classify intent for: asdf043295hf", err);
			done();
		});
	});
});