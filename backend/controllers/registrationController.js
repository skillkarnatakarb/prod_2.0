const Registration = require('../models/registration');

// Save Registration Data
exports.registerUser = async (req, res) => {
  try {
    const registrationData = req.body;
    const newRegistration = new Registration(registrationData);
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
