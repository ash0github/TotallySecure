const mongoose = require('mongoose');
const {v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userID: {type: String, default: uuidv4, index: true, unique: true, required: true},
    email: {type: String, unique: true, required: true, lowercase: true, trim: true},
    password: {type: String, unique: false, required: true},
    salt: {type: String, required: true},
    username: {type: String, unique: false, required: true, trim: true},
    roles: {type: [String], default: ['user']},
    dateOfReg: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema);