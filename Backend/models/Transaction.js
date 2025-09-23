const mongoose = require('mongoose');
const {v4: uuidv4 } = require('uuid');

const transactionSchema = new mongoose.Schema({
    transactionID: {type: String, default: uuidv4, index: true, unique: true, required: true},
    status: {type: String, enum: ['pending', 'approved', 'flagged', 'rejected'], default: 'pending', required: true},
    amount: {type: Number, required: true, min: 0},
    currency: {type: String, required: true, match: /^[A-Z]{3}$/},
    beneficiary: {type: String, required: true},
    swiftCode: {type: String, required: true, trim: true},
    dated: {type: Date, default: Date.now},
    //Relationships
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
});

module.exports = mongoose.model('Transaction', transactionSchema);