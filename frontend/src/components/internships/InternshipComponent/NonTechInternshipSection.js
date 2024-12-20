import React from 'react';

const techCourses = [
  { 
    title: 'Digital Marketing ',
    imgSrc: process.env.PUBLIC_URL + '/Assets/59.png',
     
    curriculumLink: process.env.PUBLIC_URL + '/Assets/sample_compressed.pdf',
    enrollLink: 'https://classplusapp.com/w/dean-global-ai-sxofle/courses/607775?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp',
  },
  { 
    title: 'Business Analytics',
    imgSrc: process.env.PUBLIC_URL + '/Assets/12.png',
       curriculumLink: process.env.PUBLIC_URL + '/Assets/sample_compressed.pdf',
    enrollLink: 'https://classplusapp.com/w/dean-global-ai-sxofle/courses/607781?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp',
  },
  { 
    title: 'Corporate Finance',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://classplusapp.com/w/dean-global-ai-sxofle/courses/607786?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp',
  },


  { 
    title: 'Marketing Management',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://classplusapp.com/w/dean-global-ai-sxofle/courses/607793?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp',
  },

  { 
    title: 'Investment Banking ',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://classplusapp.com/w/dean-global-ai-sxofle/courses/607796?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp',
  },


  { 
    title: 'Accounting',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://classplusapp.com/w/dean-global-ai-sxofle/courses/607783?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp',
  },

  { 
    title: 'HR Management',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://classplusapp.com/w/dean-global-ai-sxofle/courses/607799?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp',
  },


  { 
    title: 'Project Management',
    imgSrc: process.env.PUBLIC_URL + '/Assets/40bg.png',
    curriculumLink: '/Assets/zoho-preparation.pdf',
    enrollLink: 'https://classplusapp.com/w/dean-global-ai-sxofle/courses/607802?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp',
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
                width: '270px',
                height: '250px',
                borderRadius: '10px',
                objectFit: 'cover',
                marginBottom: '10px',
              }}
            />

            {/* Course Title */}
            <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '15px' }}>{course.title}</h3>
            {/* <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>{course.lessons}</p> */}



            {/* Benefits Section */}
            <h5 style={{ fontSize: '1.2rem', color: '#1976d2', marginBottom: '10px' }}>Benefits</h5>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '15px' }}>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', flex: '1' }}>
                <li>Certificate </li>
                <li>Projects</li>
              </ul>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', flex: '1' }}>
              <li>Career support</li>

                <li>Experience  Letter</li>
              </ul>
            </div>

            {/* Rounded Features */}
            {/* <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
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
            </div> */}

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
