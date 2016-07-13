const supertest = require('supertest');
const app = require('../server');
const assert = require('assert');
const usersRepository = require('../libs/users-repository');
const hat = require('hat');

function getTest(endpoint, done) {
	supertest(app)
		.get(endpoint)
		.send()
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
			done();
		});
}

describe('GET /install', () => {
	it('responds with install page', (done) => {
		getTest('/install', done);
	});
});

describe('GET /usage', () => {
	it('responds with usage page', (done) => {
		getTest('/usage', done);
	});
});

describe('GET /api', () => {
	it('responds with api page', (done) => {
		getTest('/api', done);
	});
});

describe('POST /api/users', () => {
	let testUser;

	before(function(done) {
		usersRepository.insert(`${hat()}@test.com`, (err, user) => {
			assert.equal(null, err);
			testUser = user;
			done();
		});
	});

	it('responds with api key', (done) => {
		supertest(app)
			.post('/api/users')
			.send()
			.expect(201)
			.end((err, res) => {
				if (err) return done(err);
				assert.notEqual(res.body.key, null);
				done();
			})
	});

	it('returns 400 when user with email already exists', (done) => {
		supertest(app)
			.post('/api/users')
			.send({
				email: testUser.email
			})
			.expect(400)
			.end((err, res) => {
				assert.equal(null, err);
				assert.equal("could not create new user", res.body.message);
				done();
			})
	});

	after(function() {
		usersRepository.delete(testUser.key, (err, user) => {});
	});
});

describe('PUT /api/users/:key', () => {
	let testUser;

	before(function(done) {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);
			testUser = user;
			done();
		});
	});

	it('updates a user', (done) => {
		const key = testUser.key;
		supertest(app)
			.put(`/api/users/${key}`)
			.send({
				email: "newemail@test.com"
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert.equal("newemail@test.com", res.body.email);
				done();
			});
	});

	it('returns 404 when user not found', (done) => {
		supertest(app)
			.put('/api/users/notfound')
			.send({
				email: "newemail@test.com"
			})
			.expect(404)
			.end((err, res) => {
				if (err) return done(err);
				done();
			})
	});
});

describe(`DELETE /api/users/:key`, () => {
	let testUser;
	
	beforeEach(function(done) {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);
			testUser = user;
			done();
		});
	});

	it('deletes a user', (done) => {
		supertest(app)
			.delete(`/api/users/${testUser.key}`)
			.send()
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});
});

describe(`POST /api/requests`, () => {
	let testUser;

	beforeEach(function(done) {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);
			testUser = user;
			done();
		});
	});

	it('retrieves tasks', (done) => {
		supertest(app)
			.post('/api/requests')
			.send({
				ask: "get",
				key: testUser.key
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});

	it('adds tasks', (done) => {
		supertest(app)
			.post('/api/requests')
			.send({
				ask: "add test task",
				key: testUser.key
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				done();
			});
	});

	it('gets tasks by type', (done) => {
		supertest(app)
			.post('/api/requests')
			.send({
				ask: "add test task",
				key: testUser.key
			})
			.expect(200)
			.end((err, res) => {
				assert.equal(null, err);
				supertest(app)
					.post('/api/requests')
					.send({
						ask: "get test",
						key: testUser.key
					})
					.expect(200)
					.end((err, res) => {
						if (err) return done(err);
						assert.equal(true, res.body.length >= 1);
						done();
					});
			});
	});

	it('deletes tasks', (done) => {
		supertest(app)
			.post('/api/requests')
			.send({
				ask: "add test task",
				key: testUser.key
			})
			.expect(200)
			.end((err, res) => {
				assert.equal(null, err);
				supertest(app)
					.post('/api/requests')
					.send({
						ask: "done test task",
						key: testUser.key
					})
					.expect(200)
					.end((err, res) => {
						if (err) return done(err);
						assert.notEqual(null, res.body._id);
						done();
					});
			});
	});

	it('emails tasks to user', (done) => {
		supertest(app)
			.post('/api/requests')
			.send({
				ask: "mail",
				key: testUser.key
			})
			.expect(500)
			.end((err, res) => {
				if (err) return done(err);
				assert.equal('email has not been setup yet.  you can send a PUT request to update your email', res.body.error);
				done();
			});
	});
});