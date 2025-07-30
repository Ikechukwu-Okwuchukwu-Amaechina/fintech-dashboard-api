const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'myf_in_te_ch_2025s_ec+ret';

describe('Transaction Tests', () => {
  let testUser;
  let token;

  beforeEach(async () => {
    await User.deleteMany({ username: 'transactionuser' });
    testUser = await User.create({ 
      username: 'transactionuser', 
      password: '123456',
      role: 'user',
      balance: 5000
    });
    token = jwt.sign(
      { id: testUser._id, role: testUser.role }, 
      process.env.JWT_SECRET
    );
  });

  it('should add money to account (credit)', async () => {
    const response = await request(app)
      .post('/api/transactions/credit')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 1000 });
    expect(response.status).toBe(200);
    expect(response.body.newBalance).toBe(6000);
  });

  it('should not allow negative amount', async () => {
    const response = await request(app)
      .post('/api/transactions/credit')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: -500 });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid amount');
  });
});
