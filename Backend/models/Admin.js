const mongoose = require('mongoose');
const {v4: uuidv4 } = require('uuid');

const adminSchema = new mongoose.Schema({
    adminID: {type: String, default: uuidv4, index: true, unique: true, required: true},
    email: {type: String, unique: true, required: true, lowercase: true, trim: true},
    password: {type: String, unique: false, required: true},
    salt: {type: String, required: true},
    username: {type: String, unique: false, required: true, trim: true},
    roles: {type: [String], required: true},
    dateOfReg: {type: Date, default: Date.now},
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
});

module.exports = mongoose.model('Admin', adminSchema);    