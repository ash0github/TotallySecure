const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    code: {type: String, required: true},
    expiresAt: {type: Date, required: true},
});

module.exports = mongoose.model('OTP', otpSchema);