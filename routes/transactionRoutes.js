/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a transaction (credit or debit)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [credit, debit]
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
const express = require('express');
const router = express.Router();
const { makeTransaction, getTransactionHistory, getUserBalance } = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

router.post('/', protect, makeTransaction);
router.post('/credit', protect, (req, res) => {
  req.body.type = 'credit';
  makeTransaction(req, res);
});
router.post('/debit', protect, (req, res) => {
  req.body.type = 'debit';
  makeTransaction(req, res);
});
router.get('/', protect, getTransactionHistory);
router.get('/balance', protect, getUserBalance);

module.exports = router;
