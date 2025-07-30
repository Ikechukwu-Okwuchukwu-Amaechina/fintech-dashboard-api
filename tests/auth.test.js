const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'myf_in_te_ch_2025s_ec+ret';

describe('Auth Tests', () => {
  let testUser;

  beforeEach(async () => {
    await User.deleteMany({ username: 'authuser' });
    testUser = await User.create({ 
      username: 'authuser', 
      password: 'minushere',
      role: 'user',
      balance: 5000
    });
  });

  it('should login with correct username and password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'authuser',
        password: 'minushere'
      });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should not login with wrong password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'authuser',
        password: 'wrongpassword'
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
