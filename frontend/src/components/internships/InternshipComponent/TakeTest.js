import React from 'react';

const TakeTest = () => {
  const companies = [
    {
      id: 1,
      logo: `${process.env.PUBLIC_URL}/Assets/company1.png`, // Replace with your actual logo path
      description: 'Exciting opportunity at Company 1. Apply your skills and grow with us!',
      testLink: '/test1',
    },
    {
      id: 2,
      logo: `${process.env.PUBLIC_URL}/Assets/company2.png`, // Replace with your actual logo path
      description: 'Join Company 2 for a challenging and rewarding experience.',
      testLink: '/test2',
    },
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', color: '#1976d2', marginBottom: '20px' }}>Take Your Test</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {companies.map((company) => (
          <div
            key={company.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              width: '300px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <img
              src={company.logo}
              alt="Company Logo"
              style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '10px' }}
            />
            <p style={{ fontSize: '1rem', color: '#333', marginBottom: '20px' }}>
              {company.description}
            </p>
            <a
              href={company.testLink}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#388e3c')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4caf50')}
            >
              Take Test
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TakeTest;
