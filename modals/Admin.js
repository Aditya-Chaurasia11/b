// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // ... other fields
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
