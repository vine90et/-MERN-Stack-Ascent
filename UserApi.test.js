// test/UserApi.test.js
const request = require('supertest');
const app = require('../app');

describe('User API Tests', () => {
  test('GET /api/users/:id returns user', async () => {
    const id = '1234';
    const res = await request(app).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', id);
    expect(res.body).toHaveProperty('name', 'User');
  });

  test('POST /api/users returns created user', async () => {
    const userData = { name: 'vineet', email: 'test@email.com' };
    const res = await request(app)
      .post('/api/users')
      .send(userData)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'vineet');
    expect(res.body).toHaveProperty('email', 'test@email.com');
  });
});
