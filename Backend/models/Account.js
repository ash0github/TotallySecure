const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');

const accountSchema = new mongoose.Schema({
    accountID: {type: String, default: uuidv4, index: true, unique: true, required: true},
    balance: {type: Number, required: true, default: 0.00, match: /^(?:[1-9]\d{0,17}|0)(?:\.\d{1,2})?$/},
    currency: {type: String, default: 'ZAR', required: true, match: /^[A-Z]{3}$/},
    //Relationships
    accountHolder: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
});

module.exports = mongoose.model('Account', accountSchema);