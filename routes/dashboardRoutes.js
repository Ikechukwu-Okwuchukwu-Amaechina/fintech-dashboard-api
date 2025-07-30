/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get user dashboard balance info (protected)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard info returned
 *       401:
 *         description: Unauthorized
 */
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getDashboard, getTransactions } = require('../controllers/dashboardController');

// Dashboard route - shows main dashboard
router.get('/dashboard', protect, getDashboard);

// Transactions route - shows all user transactions
router.get('/transactions', protect, getTransactions);

module.exports = router;
