const express = require('express');
const router = express.Router();
const { googleLogin, registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/authController'); // Correct path to `authController.js`

// Register (Signup) route
router.post('/register', registerUser);

// Login (Signin) route
router.post('/signin', loginUser);

// Google Login route
router.post('/google-login', googleLogin);

// Forgot Password route
router.post('/forgot-password', forgotPassword);

// Reset Password route
router.post('/reset-password', resetPassword);

module.exports = router;
