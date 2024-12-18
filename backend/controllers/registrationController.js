const Registration = require('../models/registration');

// Save Registration Data
exports.registerUser = async (req, res) => {
  try {
    const { email, phoneNumber, ...otherData } = req.body;

    // Normalize input
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phoneNumber.trim();

    // Check for duplicates based on email or phone number
    const existingUser = await Registration.findOne({
      $or: [{ email: normalizedEmail }, { phoneNumber: normalizedPhone }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already registered with this email or phone number.',
      });
    }

    // Save new registration data
    const newRegistration = new Registration({
      email: normalizedEmail,
      phoneNumber: normalizedPhone,
      ...otherData,
    });

    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({
      message: 'Failed to register user',
      error: error.message,
    });
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
