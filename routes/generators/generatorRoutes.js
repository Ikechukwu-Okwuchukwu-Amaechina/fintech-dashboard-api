const express = require('express');
const router = express.Router();
const { generateTransactions } = require('../../controllers/generators/transactionGenerator');

// POST route to generate transactions
router.post('/transactions', generateTransactions);

module.exports = router;
