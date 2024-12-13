import React from 'react';

const techInternships = [
  { title: 'Tech Internship 1', curriculumLink: '/curriculum1', enrollLink: '/enroll1' },
  { title: 'Tech Internship 2', curriculumLink: '/curriculum2', enrollLink: '/enroll2' },
  // Add more internships here...
];

const TechInternshipSection = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', color: '#1976d2', marginBottom: '20px' }}>Tech Internships</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {techInternships.map((internship, index) => (
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
            <h3>{internship.title}</h3>
            <button
              onClick={() => window.location.href = internship.curriculumLink}
              style={{
                padding: '10px 20px',
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              Curriculum
            </button>
            <button
              onClick={() => window.location.href = internship.enrollLink}
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
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechInternshipSection;
