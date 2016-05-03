var assert = require('assert'),
    classify = require('../libs/intent-classifier');

describe('intent-classifier', function() {
    describe('deleting a task', function() {
        it('sentence should classify deletion task', function(done) {
            assert.equal("delete", classify("done task"));
            assert.equal("delete all", classify("done all tasks"));
            assert.equal("delete", classify("completed task"));
            assert.equal("delete", classify("finished task"));
            assert.equal("delete", classify("finish task"));
            assert.equal("delete", classify("delete something"));
            done();
        });
    });
});

describe('intent-classifier', function() {
    describe('deleting all tasks', function() {
        it('sentence should classify deletion of tasks given a type', function(done) {
            assert.equal("delete all", classify("done all tasks"));
            assert.equal("delete all", classify("completed all task"));
            assert.equal("delete all", classify("finished all task"));
            assert.equal("delete all", classify("delete all something"));
            done();
        });
    });
});

describe('intent-classifier', function() {
    describe('is lenient with typos', function() {
        it('sentence should classify if command is slightly mistyped', function(done) {
            assert.equal("delete", classify("don tasks"));
            assert.equal("delete all", classify("complted all task"));
            assert.equal("delete", classify("finishe task"));
            assert.equal("delete", classify("delet something"));
            assert.equal("add", classify("ad something"));
            assert.equal("add", classify("nw something"));
            done();
        });
    });
});


describe('intent-classifier', function() {
    describe('adding a task', function() {
        it('sentence should classify adding a task', function(done) {
            assert.equal("add", classify("add a new task"));
            assert.equal("add", classify("add something"));
            assert.equal("add", classify("new task"));
            assert.equal("add", classify("new something"));
            done();
        });
    });
});
