const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Utility Function: Generate JWT Token
const generateToken = (id, role, email) => {
  return jwt.sign({ id, role, email }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


// -----------------------------
// Register (Signup) Controller
// -----------------------------
const registerUser = async (req, res) => {
  const { name, email, password, role, mobile } = req.body;

  if (!name || !email || !password || !role || !mobile) {
    return res.status(400).json({ message: "All fields are required, including mobile number." });
  }

  const validRoles = ["student", "corporate", "college"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role. Choose student, corporate, or college." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ name, email, password, role, mobile });

    // Generate JWT Token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      mobile: user.mobile,
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -----------------------------
// Login (Signin) Controller
// -----------------------------
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id, user.role, user.email); // Include email
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};








// -----------------------------
// Google Login Controller
// -----------------------------
const googleLogin = async (req, res) => {
  const { email, name, role } = req.body;

  if (!email || !name || !role) {
    return res.status(400).json({ message: "Email, name, and role are required." });
  }

  const validRoles = ["student", "corporate", "college"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role. Choose student, corporate, or college." });
  }

  try {
    let user = await User.findOne({ email });

    // If user does not exist, create a new one
    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email,
        isGoogleUser: true, // Mark as Google user
        password: "", // No password for Google users
        role,
        mobile: "",
      });
    }

    // Generate JWT Token
    const token = generateToken(user._id, user.role);

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      mobile: user.mobile,
      token,
    });
  } catch (error) {
    console.error("Google Login Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -----------------------------
// Forgot Password Controller
// -----------------------------
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Generate a reset token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    });

    res.status(200).json({ message: "Password reset link sent!" });
  } catch (error) {
    console.error("Error during forgot password:", error.message);
    res.status(500).json({ message: "An error occurred.", error: error.message });
  }
};

// -----------------------------
// Reset Password Controller
// -----------------------------
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Update password (hashed in pre-save hook)
    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Error during reset password:", error.message);
    res.status(400).json({ message: "Invalid or expired token.", error: error.message });
  }
};

// -----------------------------
// Exporting Controllers
// -----------------------------
module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
};
