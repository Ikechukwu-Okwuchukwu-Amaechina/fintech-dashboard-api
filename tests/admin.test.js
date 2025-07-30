const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'myf_in_te_ch_2025s_ec+ret';

describe('Admin Tests', () => {
  let adminUser;
  let regularUser;
  let adminToken;
  let userToken;

  beforeEach(async () => {
    await User.deleteMany({ username: { $in: ['adminuser', 'regularuser'] } });
    adminUser = await User.create({ 
      username: 'adminuser', 
      password: 'minushere',
      role: 'admin',
      balance: 10000
    });
    regularUser = await User.create({ 
      username: 'regularuser', 
      password: 'minushere',
      role: 'user',
      balance: 5000
    });
    adminToken = jwt.sign(
      { id: adminUser._id, role: adminUser.role }, 
      process.env.JWT_SECRET
    );
    userToken = jwt.sign(
      { id: regularUser._id, role: regularUser.role }, 
      process.env.JWT_SECRET
    );
  });

  it('should allow admin to access admin routes', async () => {
    const response = await request(app)
      .get('/api/test/admin-only')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin access granted');
  });

  it('should not allow regular user to access admin routes', async () => {
    const response = await request(app)
      .get('/api/test/admin-only')
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Admin access required');
  });
});
