var assert = require('assert'),
	proxyquire = require('proxyquire');

var stubs = {
	'./tasks-repository': {
		'deleteSingle': function(id, callback) {
			callback(id);
		}
	},
	'./fuzzy-match': {
		'search': function(description, searchField, callback) {
			callback([description]);
		}
	}
};

var deleteTask = proxyquire('../libs/delete-single-task', stubs);

describe('delete-task', function() {
	it('should delete when task found', function(done) {
		var task = {
			_id: 'id'
		};
		deleteTask(task, function(id) {
			assert.equal('id', id);
			done();
		});
	});
});

describe('delete-task', function() {
	it('should return message when no task found', function(done) {
		deleteTask(null, function(err, res) {
			assert.equal('no match found', err);
			assert.equal(null, res);
			done();
		});
	});
});