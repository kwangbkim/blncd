var assert = require('assert'),
	proxyquire = require('proxyquire');

var stubs = {
	'./tasks-repository': {
		'deleteByType': function(id, callback) {
			callback(id);
		}
	},
	'./fuzzy-match': {
		'search': function(description, searchField, callback) {
			callback([description]);
		}
	}
};

var deleteTask = proxyquire('../libs/delete-tasks-type', stubs);

describe('delete-task', function() {
	it('should delete when type found', function(done) {
		var task = {
			type: 'type'
		};
		deleteTask(task, function(type) {
			assert.equal('type', type);
			done();
		});
	});
});

describe('delete-task', function() {
	it('should return message when no type found', function(done) {
		deleteTask(null, function(err, res) {
			assert.equal('no match found for type: null', err);
			assert.equal(null, res);
			done();
		});
	});
});