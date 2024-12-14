const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  degree: { type: String, required: true },
  branch: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true, enum: ['Placement Officer', 'Faculty', 'HOD', 'Student'] }, // Added Role field
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
