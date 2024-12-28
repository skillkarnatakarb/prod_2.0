const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  degree: { type: String, required: true },
  branch: { type: String, required: true },
  phoneNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  address: { type: String, required: true },
  role: { type: String, required: true, enum: ['Placement Officer', 'Faculty', 'HOD', 'Student'] },
  dob: { type: Date, required: true },
  usn: { type: String, required: true, match: /^[A-Za-z0-9]+$/ },
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
