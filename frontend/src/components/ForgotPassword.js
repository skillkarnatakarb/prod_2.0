import React, { useState } from "react";
import axios from "axios";
import "../styles/Form.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
      setSuccess("Password reset link has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div className="card-container">
        <h2>Forgot Password?</h2>
        <p>No worries, we'll send you reset instructions.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-button">
            Reset Password
          </button>
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="form-text">
          <a href="/signin">Back to log in</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
