const User = require('../models/User');
const Transaction = require('../models/Transaction');

const makeTransaction = async (req, res) => {
    try {
        const { type, amount } = req.body;
        const userId = req.user.id;

        // Validate transaction type
        if (!type || !['credit', 'debit'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid transaction type. Must be credit or debit.'
            });
        }

        // Validate amount
        const numericAmount = Number(amount);
        if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount'
            });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        // Ensure user balance is a number
        const currentBalance = Number(user.balance);
        let newBalance;

        if (type === 'credit') {
            newBalance = currentBalance + numericAmount;
        } else {
            // Check if user has enough balance for debit
            if (currentBalance < numericAmount) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient balance.'
                });
            }
            newBalance = currentBalance - numericAmount;
        }

        // Update user balance
        user.balance = newBalance;
        await user.save();

        // Create transaction record
        const transaction = new Transaction({
            user: userId,
            type: type,
            amount: numericAmount,
            balanceAfter: newBalance
        });

        await transaction.save();

        res.status(200).json({
            success: true,
            message: 'Transaction completed successfully.',
            newBalance: newBalance,
            data: {
                transaction,
                balanceAfter: newBalance
            }
        });

    } catch (error) {
        console.error('Transaction error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};


const getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const transactions = await Transaction.find({ user: userId })
            .sort({ timestamp: -1 })
            .populate('user', 'username');

        res.status(200).json({
            success: true,
            data: transactions
        });

    } catch (error) {
        console.error('Get transaction history error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

const getUserBalance = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId).select('balance username');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                username: user.username,
                balance: user.balance
            }
        });

    } catch (error) {
        console.error('Get balance error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};

module.exports = {
    makeTransaction,
    getTransactionHistory,
    getUserBalance
};
