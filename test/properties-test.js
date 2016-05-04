var assert = require('assert'),
  props = require('../libs/properties');

describe('properties', function () {
  describe('#get()', function () {
    it('should get property from config file', function (done) {
      var url = props.get("mongo:url");
      assert.notEqual(null, url);
      done();
    });
  });
});
