import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "../styles/Form.css";
import { API_BASE_URL } from "../config";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Invalid email format");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await axios.post(`${API_BASE_URL}/auth/google-login`, {
        email: user.email,
        name: user.displayName || "Google User",
      });

      // Save the email in localStorage
      localStorage.setItem("email", user.email);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Redirect based on role
      switch (response.data.role) {
        case "student":
          navigate("/student-dashboard");
          break;
        case "corporate":
          navigate("/corporate-dashboard");
          break;
        case "college":
          navigate("/college-dashboard");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setError("Google Sign-In failed! Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (emailError) {
      setError("Please fix the email error before submitting");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signin`, formData);

      // Save the email in localStorage
      localStorage.setItem("email", formData.email);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Redirect based on role
      switch (response.data.role) {
        case "student":
          navigate("/student-dashboard");
          break;
        case "corporate":
          navigate("/corporate-dashboard");
          break;
        case "college":
          navigate("/college-dashboard");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div className="card-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-text">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="form-button">
            Sign In
          </button>
          <button type="button" className="google-button" onClick={handleGoogleSignIn}>
            <i className="fab fa-google"></i> Continue with Google
          </button>
          <p className="form-text">
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signin;
