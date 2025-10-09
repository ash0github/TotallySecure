const mongoose = require('mongoose');

const allowIpSchema = new mongoose.Schema({
  value: { type: String, required: true }, // "41.24.82.2/32" or "74.220.48.0/24"
  label: { type: String, default: '' },    // who/what this is for
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

allowIpSchema.index({ value: 1 }, { unique: true });

module.exports = mongoose.model('AllowIp', allowIpSchema);
