const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the List model
    ref: 'List',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', studentSchema);
