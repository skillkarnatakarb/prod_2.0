const express = require('express');
const router = express.Router();
const { registerUser, getRegistrations } = require('../controllers/registrationController');

// POST: Register a user
router.post('/register', registerUser);

// GET: Fetch all registrations
router.get('/registrations', getRegistrations);

module.exports = router;
