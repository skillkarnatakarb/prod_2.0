import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../api/api';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    degree: '',
    branch: '',
    role: '',
    phoneNumber: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({ type: '', message: '' });

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.college) newErrors.college = 'College is required';
    if (!formData.degree) newErrors.degree = 'Degree is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Invalid phone number';
    if (!emailRegex.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      showTemporaryPopup('notice', 'Form is getting submitted. Please wait!');
      return;
    }

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await registerUser(formData);
        setSuccessMessage(response.message);
        showTemporaryPopup('success', 'Registration Successful! All the very best for your test.');
        setTimeout(() => {
          navigate('/taketest');
        }, 5000);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to register');
        showTemporaryPopup('error', error.response?.data?.message || 'Failed to register');
      } finally {
        setLoading(false);
      }
    }
  };

  // Helper function to show a popup for 5 seconds
  const showTemporaryPopup = (type, message) => {
    setShowPopup({ type, message });
    setTimeout(() => {
      setShowPopup({ type: '', message: '' });
    }, 5000);
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>Register for Test</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {['name', 'college', 'degree', 'branch', 'phoneNumber', 'email', 'address'].map((field) => (
            <div key={field}>
              <label style={{ display: 'block', marginBottom: '5px' }}>{field}:</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors[field] && <span style={errorStyle}>{errors[field]}</span>}
            </div>
          ))}

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
              <option value="">Select Role</option>
              <option value="Placement Officer">Placement Officer</option>
              <option value="Faculty">Faculty</option>
              <option value="HOD">HOD</option>
              <option value="Student">Student</option>
            </select>
            {errors.role && <span style={errorStyle}>{errors.role}</span>}
          </div>

          <button type="submit" style={submitButtonStyle(loading)}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Popup */}
      {showPopup.type && (
        <div style={popupStyle} className="fadeIn">
          <h2 style={{ color: showPopup.type === 'success' ? '#1976d2' : '#d32f2f' }}>
            {showPopup.type === 'success' ? 'Success' : showPopup.type === 'notice' ? 'Notice' : 'Error'}
          </h2>
          <p>{showPopup.message}</p>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
};

const formStyle = {
  width: '100%',
  maxWidth: '500px',
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  textAlign: 'center',
  color: '#1976d2',
  marginBottom: '20px',
  fontSize: '1.8rem',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '1rem',
};

const errorStyle = { color: 'red', fontSize: '12px' };

const submitButtonStyle = (loading) => ({
  padding: '10px 20px',
  backgroundColor: loading ? '#ccc' : '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: loading ? 'not-allowed' : 'pointer',
});

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  zIndex: 1000,
};

export default RegistrationForm;
