const mongoose = require("mongoose");

const stuProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, default: "Male" },
  phoneNumber: { type: String },
  email: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  district: { type: String },
  state: { type: String },
  pincode: { type: String },
  qualification: { type: String },
  specialization: { type: String },
  collegeName: { type: String },
  yearOfPassing: { type: String },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  resume: { type: String },
});

module.exports = mongoose.model("StuProfile", stuProfileSchema);
