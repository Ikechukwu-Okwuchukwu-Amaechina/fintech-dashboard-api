const Transaction = require('../models/Transaction');

const getDashboard = async (req, res) => {
    try {
        const user = req.user;
        
        const transactions = await Transaction.find({ user: user._id });
        
        res.json({
            user: {
                username: user.username,
                role: user.role,
                balance: user.balance
                ,profileImage: user.profileImage || null
            },
            totalTransactions: transactions.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getDashboard,
    getTransactions
};
