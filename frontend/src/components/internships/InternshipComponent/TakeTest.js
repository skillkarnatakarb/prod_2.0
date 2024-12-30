import React from 'react';
import Header from '../../Header';

const CourseCards = () => {
  const undergraduateCourses = [
    { id: 1, course: 'BCA', icon: '📘', link: 'https://example.com/test-bca' },
    { id: 2, course: 'BBA', icon: '📗', link: 'https://example.com/test-bba' },
    { id: 3, course: 'BSc', icon: '🔬', link: 'https://example.com/test-bsc' },
    { id: 4, course: 'BCom', icon: '💼', link: 'https://example.com/test-bcom' },
  ];

  


  const renderCards = (courses) =>
    courses.map((course) => (
      <div
        key={course.id}
        style={{
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '20px',
          width: '200px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{course.icon}</div>
        <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>
          {course.course}
        </h3>
        <a
          href={course.link}
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
          target="_blank"
          rel="noopener noreferrer"
        >
          Take Test
        </a>
      </div>
    ));

  return (
    <div style={{ backgroundColor: 'rgba(255, 253, 252, 0.73)' }}>
      {/* Add the Header component */}
      <Header />
      <div>
    <div style={{ padding: '20px', textAlign: 'center',paddingTop:'70px' ,height:'100%'}}>
      <h2 style={{ fontSize: '2rem', color: '#1976d2', marginBottom: '70px' }}>
        Choose Your Course
      </h2>

      {/* Undergraduate Section */}
      <div style={{ marginBottom: '70px' }}>
        <h3 style={{ fontSize: '1.8rem', color: '#1976d2', marginBottom: '40px' }}>
          Undergraduate Degrees
        </h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          {renderCards(undergraduateCourses)}
        </div>
      </div>
</div>
</div>
    
    </div>
  );
};

export default CourseCards;
