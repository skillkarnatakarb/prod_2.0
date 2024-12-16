import React from 'react';

const techCourses = [
  { 
    title: 'Frontend Development ',
    imgSrc: process.env.PUBLIC_URL + '/Assets/59.png',
     
    curriculumLink: process.env.PUBLIC_URL + '/Assets/sample_compressed.pdf',
    enrollLink: 'https://example.com/enroll-tcs-codevita',
  },
  { 
    title: 'Cloud Computing',
    imgSrc: process.env.PUBLIC_URL + '/Assets/12.png',
       curriculumLink: process.env.PUBLIC_URL + '/Assets/sample_compressed.pdf',
    enrollLink: 'https://example.com/enroll-product-based',
  },
  { 
    title: 'Cyber Security',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://example.com/enroll-zoho',
  },


  { 
    title: 'Blockchain',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://example.com/enroll-zoho',
  },

  { 
    title: 'Devops',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://example.com/enroll-zoho',
  },


  { 
    title: 'Data Science',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://example.com/enroll-zoho',
  },

  { 
    title: 'Data Analytics',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://example.com/enroll-zoho',
  },


  { 
    title: 'Software Testing',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://example.com/enroll-zoho',
  },

];

const TechCoursesSection = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', color: '#1976d2', marginBottom: '20px' }}>Non Technical Courses</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {techCourses.map((course, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '15px',
              width: '300px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.86)',
              textAlign: 'left',
            }}
          >
            {/* Course Image */}
            <img
              src={course.imgSrc}
              alt={course.title}
              style={{
                width: '100%',
                height: '150px',
                borderRadius: '10px',
                objectFit: 'cover',
                marginBottom: '10px',
              }}
            />

            {/* Course Title */}
            <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '15px' }}>{course.title}</h3>
            {/* <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>{course.lessons}</p> */}

            {/* Rounded Features */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {['Certificate', 'Offer Letter', 'Project', 'Experience Letter'].map((feature, idx) => (
                <span
                  key={idx}
                  style={{
                    border: '1px solid #1976d2',
                    borderRadius: '20px',
                    padding: '5px 10px',
                    fontSize: '0.8rem',
                    color: '#1976d2',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '5px',
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {/* Curriculum Button */}
              <a
                href={course.curriculumLink}
                download
                style={{
                  display: 'inline-block',
                  padding: '8px 15px',
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
              >
                Curriculum
              </a>

              {/* Enroll Button */}
              <a
                href={course.enrollLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '8px 15px',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
              >
                Enroll
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechCoursesSection;
