const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

// Generate fake transactions for testing
const generateTransactions = async (req, res) => {
    try {
        // Get number of transactions to generate (default 10)
        const count = req.body.count || 10;
        
        // Get all users from database
        const users = await User.find({});
        
        if (users.length === 0) {
            return res.status(400).json({ 
                message: 'No users found. Please create users first.' 
            });
        }
        
        // Array to store generated transactions
        const transactions = [];
        
        // Sample descriptions for transactions
        const descriptions = [
            'Grocery shopping',
            'Gas station',
            'Online purchase',
            'Restaurant meal',
            'Coffee shop',
            'Salary deposit',
            'Freelance payment',
            'Bank transfer',
            'Utility bill',
            'Rent payment',
            'Insurance payment',
            'Mobile recharge',
            'Movie tickets',
            'Book purchase',
            'Gym membership'
        ];
        
        // Generate transactions
        for (let i = 0; i < count; i++) {
            // Pick random user
            const randomUser = users[Math.floor(Math.random() * users.length)];
            
            // Pick random transaction type
            const types = ['credit', 'debit'];
            const randomType = types[Math.floor(Math.random() * types.length)];
            
            // Generate random amount (between 10 and 1000)
            const randomAmount = Math.floor(Math.random() * 990) + 10;
            
            // Pick random description
            const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
            
            // Create transaction object
            const transaction = {
                type: randomType,
                amount: randomAmount,
                description: randomDescription,
                user: randomUser._id
            };
            
            transactions.push(transaction);
        }
        
        // Save all transactions to database
        const savedTransactions = await Transaction.insertMany(transactions);
        
        res.status(200).json({
            message: `Successfully generated ${savedTransactions.length} transactions`,
            transactions: savedTransactions
        });
        
    } catch (error) {
        console.error('Error generating transactions:', error);
        res.status(500).json({ 
            message: 'Error generating transactions', 
            error: error.message 
        });
    }
};

module.exports = {
    generateTransactions
};
