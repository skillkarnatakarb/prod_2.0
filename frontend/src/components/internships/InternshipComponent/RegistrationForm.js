import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../api/api';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Header';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    College: '',
    Degree: '',
    Branch: '',
    PhoneNumber: '',
    Email: '',
    Address: '',
    Role: '',
    DOB: '',
    USN: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({ type: '', message: '' });

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usnRegex = /^[A-Za-z0-9]+$/;

    if (!formData.Name) newErrors.Name = 'Name is required';
    if (!formData.College) newErrors.College = 'College is required';
    if (!formData.Degree) newErrors.Degree = 'Degree is required';
    if (!formData.Branch) newErrors.Branch = 'Branch is required';
    if (!formData.Role) newErrors.Role = 'Role is required';
    if (!formData.DOB) newErrors.DOB = 'Date of Birth is required';
    if (!formData.USN || !usnRegex.test(formData.USN)) newErrors.USN = 'Invalid USN';
    if (!phoneRegex.test(formData.PhoneNumber)) newErrors.PhoneNumber = 'Invalid phone number';
    if (!emailRegex.test(formData.Email)) newErrors.Email = 'Invalid email address';
    if (!formData.Address) newErrors.Address = 'Address is required';

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
        await registerUser(formData);
        showTemporaryPopup('success', 'Registration Successful! All the very best for your test.');
        setTimeout(() => navigate('/taketest'), 5000);
      } catch (error) {
        console.error('Registration error:', error);
        showTemporaryPopup('error', error.response?.data?.message || 'Failed to register');
      } finally {
        setLoading(false);
      }
    }
  };

  const showTemporaryPopup = (type, message) => {
    setShowPopup({ type, message });
    setTimeout(() => setShowPopup({ type: '', message: '' }), 5000);
  };

  const fields = [
    { name: 'Name', label: 'Name' },
    { name: 'College', label: 'College' },
    { name: 'Degree', label: 'Degree' },
    { name: 'Branch', label: 'Branch' },
    { name: 'PhoneNumber', label: 'Phone Number' },
    { name: 'Email', label: 'Email' },
    { name: 'Address', label: 'Address' },
    { name: 'USN', label: 'USN' },
  ];

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    paddingTop: '70px',
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

  return (
    <div style={{ backgroundColor: 'rgba(255, 253, 252, 0.73)' }}>
      <Header />
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2 style={headerStyle}>Register for Test</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {fields.map(({ name, label }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                error={!!errors[name]}
                helperText={errors[name]}
                fullWidth
              />
            ))}

            <TextField
              label="Date of Birth"
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              error={!!errors.DOB}
              helperText={errors.DOB}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              select
              label="Role"
              name="Role"
              value={formData.Role}
              onChange={handleChange}
              error={!!errors.Role}
              helperText={errors.Role}
              fullWidth
            >
              {['Placement Officer', 'Faculty', 'HOD', 'Student'].map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>

            <button type="submit" style={submitButtonStyle(loading)}>
              {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
            </button>
          </form>
        </div>

        {showPopup.type && (
          <div style={popupStyle}>
            <h2 style={{ color: showPopup.type === 'success' ? '#1976d2' : '#d32f2f' }}>
              {showPopup.type === 'success' ? 'Success' : 'Error'}
            </h2>
            <p>{showPopup.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
