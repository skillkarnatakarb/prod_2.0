import React from 'react';
import { useNavigate } from 'react-router-dom';

const universities = [
  { name: 'University 1', date: '2024-01-01', takeTestLink: '/test1', registerLink: '/register' },
  { name: 'University 2', date: '2024-01-02', takeTestLink: '/test2', registerLink: '/register' },
  // Add more universities here...
];

const University = () => {
  const navigate = useNavigate();

  const handleRegisterClick = (registerLink) => {
    navigate(registerLink);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', color: '#1976d2', marginBottom: '20px' }}>Universities</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {universities.map((university, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              width: '300px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/Assets/university${index + 1}.png`}
              alt={university.name}
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
            />
            <h3>{university.name}</h3>
            <p>Date: {university.date}</p>

            <button
              onClick={() => handleRegisterClick(university.registerLink)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default University;