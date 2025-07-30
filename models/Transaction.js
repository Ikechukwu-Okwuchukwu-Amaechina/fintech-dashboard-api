const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['credit', 'debit'] 
    },
    amount: {
        type: Number,
        required: true,
        min: 0 
    },
    balanceAfter: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: false // Optional field
    },
    timestamp: {
        type: Date,
        default: Date.now // Default to current date
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
