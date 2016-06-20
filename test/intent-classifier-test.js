var assert = require('assert'),
  classify = require('../libs/intent-classifier');

describe('intent-classifier', function() {
  it('sentence should classify deletion task', function(done) {
    assert.equal("delete single", classify("done"));
    assert.equal("delete single", classify("completed"));
    assert.equal("delete single", classify("delete"));
    done();
  });

  it('sentence should classify deletion of tasks given a type', function(done) {
    assert.equal("delete type", classify("finished"));
    assert.equal("delete type", classify("finish"));
    done();
  });

  it('sentence should classify if command is slightly mistyped', function(done) {
    assert.equal("delete single", classify("don"));
    assert.equal("delete type", classify("finishe"));
    assert.equal("delete single", classify("delet"));
    assert.equal("add", classify("ad"));
    assert.equal("add", classify("ne"));
    done();
  });

  it('sentence should classify adding a task', function(done) {
    assert.equal("add", classify("add"));
    assert.equal("add", classify("new"));
    done();
  });

  it('sentence should classify getting tasks', function(done) {
    assert.equal("get", classify("get"));
    done();
  });

  it('returns null when cant classify', function(done) {
    assert.equal(null, classify(""));
    assert.equal(null, classify("asdf043295hf"));
    done();
  });
});