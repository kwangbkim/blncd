const supertest = require('supertest');
const app = require('../server');
const assert = require('assert');
const usersRepository = require('../libs/users-repository');

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
});

describe(`DELETE /api/users/:key`, () => {
	it('deletes a user', (done) => {
		usersRepository.insert("test2@test.com", (err, user) => {
			assert.equal(null, err);

			const key = user.key;
			supertest(app)
				.delete(`/api/users/${key}`)
				.send()
				.expect(200)
				.end(function(err, res) {
					if (err) return done(err);
					done();
				});
		});
	});
});

describe(`POST /api/requests`, () => {
	it('sends a new request', (done) => {
		usersRepository.insert(null, (err, user) => {
			assert.equal(null, err);

			const key = user.key;
			supertest(app)
				.post('/api/requests')
				.send({ ask: "get", key: key})
				.expect(200)
				.end(function(err, res) {
					if (err) return done(err);
					done();
				});
		});
	});
});