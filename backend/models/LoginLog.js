// backend/models/LoginLog.js
const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  email: { type: String },
  success: { type: Boolean },
  ip: { type: String },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
