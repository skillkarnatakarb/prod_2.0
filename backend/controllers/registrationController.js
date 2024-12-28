const Registration = require('../models/registration');

// Save Registration Data
exports.registerUser = async (req, res) => {
  try {
    // Destructure required fields
    const { name, college, degree, branch, phoneNumber, email, address, dob, usn, role } = req.body;

    // Validate all required fields
    if (!name || !college || !degree || !branch || !phoneNumber || !email || !address || !dob || !usn || !role) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Normalize input
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phoneNumber.trim();
    const normalizedUSN = usn.trim().toUpperCase();

    // Check for duplicates
    const existingUser = await Registration.findOne({
      $or: [{ email: normalizedEmail }, { phoneNumber: normalizedPhone }, { usn: normalizedUSN }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already registered with this email, phone number, or USN.',
      });
    }

    // Save new registration
    const newRegistration = new Registration({
      name,
      college,
      degree,
      branch,
      phoneNumber: normalizedPhone,
      email: normalizedEmail,
      address,
      dob: new Date(dob),
      usn: normalizedUSN,
      role,
    });

    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};


// Get All Registrations
exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json({ registrations });
  } catch (error) {
    console.error('Error Fetching Registrations:', error.message);
    res.status(500).json({ message: 'Failed to fetch registrations', error: error.message });
  }
};
