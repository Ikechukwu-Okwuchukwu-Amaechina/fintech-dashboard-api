const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'myf_in_te_ch_2025s_ec+ret';

describe('Dashboard Tests', () => {
  let testUser;
  let token;

  beforeEach(async () => {
    await User.deleteMany({ username: 'dashboarduser' });
    const hashedPassword = await bcrypt.hash('mypassword', 10);
    testUser = await User.create({ 
      username: 'dashboarduser', 
      password: hashedPassword,
      role: 'user',
      balance: 5000
    });
    token = jwt.sign(
      { id: testUser._id, role: testUser.role }, 
      process.env.JWT_SECRET
    );
  });

  it('should get dashboard data when logged in', async () => {
    const response = await request(app)
      .get('/api/dashboard')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe('dashboarduser');
    expect(response.body.user.balance).toBe(5000);
  });

  it('should not get dashboard data without token', async () => {
    const response = await request(app)
      .get('/api/dashboard');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Not authorized, no token provided');
  });
});
