var assert = require('assert'),
	proxyquire = require('proxyquire');

var stubs = {
	'./tasks-repository': {
		'deleteByType': function(key, id, callback) {
			callback(id);
		}
	},
	'./fuzzy-match': {
		'search': function(key, description, searchField, callback) {
			callback([description]);
		}
	}
};

var deleteTask = proxyquire('../libs/delete-tasks-type', stubs);

describe('delete-task-type', function() {
	it('should delete when type found', function(done) {
		var task = {
			type: 'type'
		};
		deleteTask("key", task, function(type) {
			assert.equal('type', type);
			done();
		});
	});

	it('should return message when no type found', function(done) {
		deleteTask("key", null, function(err, res) {
			assert.equal('no match found for type: null', err);
			assert.equal(null, res);
			done();
		});
	});
});