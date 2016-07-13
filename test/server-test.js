const supertest = require('supertest');
const app = require('../server');
const assert = require('assert');
const usersRepository = require('../libs/users-repository');

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
});

describe('PUT /api/users/:key', () => {
	it('updates a user', (done) => {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);

			const key = user.key;
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
				})
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
	it('deletes a user', (done) => {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);

			const key = user.key;
			supertest(app)
				.delete(`/api/users/${key}`)
				.send()
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					done();
				});
		});
	});
});

describe(`POST /api/requests`, () => {
	it('retrieves tasks', (done) => {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);

			const key = user.key;
			supertest(app)
				.post('/api/requests')
				.send({
					ask: "get",
					key: key
				})
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					done();
				});
		});
	});

	it('adds tasks', (done) => {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);

			const key = user.key;
			supertest(app)
				.post('/api/requests')
				.send({
					ask: "add test task",
					key: key
				})
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					done();
				});
		});
	});

	it('gets tasks by type', (done) => {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);

			const key = user.key;
			supertest(app)
				.post('/api/requests')
				.send({
					ask: "add test task",
					key: key
				})
				.expect(200)
				.end((err, res) => {
					assert.equal(null, err);
					supertest(app)
						.post('/api/requests')
						.send({
							ask: "get test",
							key: key
						})
						.expect(200)
						.end((err, res) => {
							if (err) return done(err);
							assert.equal(true, res.body.length >= 1);
							done();
						});
				});
		});
	});

	it('deletes tasks', (done) => {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);

			const key = user.key;
			supertest(app)
				.post('/api/requests')
				.send({
					ask: "add test task",
					key: key
				})
				.expect(200)
				.end((err, res) => {
					assert.equal(null, err);
					supertest(app)
						.post('/api/requests')
						.send({
							ask: "done test task",
							key: key
						})
						.expect(200)
						.end((err, res) => {
							if (err) return done(err);
							assert.notEqual(null, res.body._id);
							done();
						});
				});
		});
	});

	it('emails tasks to user', (done) => {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);

			const key = user.key;
			supertest(app)
				.post('/api/requests')
				.send({
					ask: "mail",
					key: key
				})
				.expect(500)
				.end((err, res) => {
					if (err) return done(err);
					assert.equal('email has not been setup yet.  you can send a PUT request to update your email', res.body.error);
					done();
				});
		});
	});
});