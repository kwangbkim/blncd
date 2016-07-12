const assert = require('assert');
const proxyquire = require('proxyquire');

const stubs = {
	'./tasks-repository': {
		'deleteSingle': function(id, callback) {
			callback(id);
		}
	},
	'./fuzzy-match': {
		'search': function(key, description, searchField, callback) {
			callback([description]);
		}
	}
};

const deleteTask = proxyquire('../libs/delete-single-task', stubs);

describe('delete-single-task', function() {
	it('should delete when task found', function(done) {
		const task = {
			_id: 'id'
		};
		deleteTask("key", task, function(id) {
			assert.equal('id', id);
			done();
		});
	});

	it('should return message when no task found', function(done) {
		deleteTask("key", null, function(err, res) {
			assert.equal('cant delete single task for description: null', err);
			assert.equal(null, res);
			done();
		});
	});
});