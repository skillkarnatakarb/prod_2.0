import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../api/api';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    degree: '',
    branch: '',
    phoneNumber: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.college) newErrors.college = 'College is required';
    if (!formData.degree) newErrors.degree = 'Degree is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
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
    if (validateForm()) {
      try {
        const response = await registerUser(formData);
        setSuccessMessage(response.message);
        setFormData({
          name: '',
          college: '',
          degree: '',
          branch: '',
          phoneNumber: '',
          email: '',
          address: '',
        });
        setShowPopup(true); // Show popup animation
        setTimeout(() => {
          setShowPopup(false); // Hide popup
          navigate('/taketest'); // Redirect after the animation
        }, 3000);
      } catch (error) {
        alert('Failed to register: ' + error.message);
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        fontFamily: 'Arial, sans-serif',
      }}
    >

        
        {/* Define the animation styles */}
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>


      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#1976d2',
            marginBottom: '20px',
            fontSize: '1.8rem',
            fontWeight: 'bold',
          }}
        >
          Register for Test
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {Object.keys(formData).map((field) => (
            <div key={field}>
              <label style={{ display: 'block', marginBottom: '5px', textTransform: 'capitalize' }}>
                {field}:
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={field}
                value={formData[field]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '1rem',
                }}
              />
              {errors[field] && <span style={{ color: 'red', fontSize: '12px' }}>{errors[field]}</span>}
            </div>
          ))}
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#1565c0')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#1976d2')}
          >
            Submit
          </button>
        </form>
      </div>

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              animation: 'fadeIn 1s ease-in-out',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', color: '#1976d2', marginBottom: '10px' }}>
              Registration Successful!
            </h2>
            <p style={{ fontSize: '1rem', color: '#333' }}>All the very best for your test!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
