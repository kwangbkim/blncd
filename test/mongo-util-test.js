var mongo = require('../libs/mongo-util');

describe('mongo-util', function () {
  describe('#connectToServer()', function () {
    it('should connect to database', function (done) {
      mongo.connectToServer(done);
    });
  });
});
