import React from 'react';
import { useNavigate } from 'react-router-dom';

const universities = [
  { name: 'Mysore University', date: '2025-01-01', takeTestLink: '/test1', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/Mysore.png` },
  
  { name: 'KSOU Mysuru', date: '2025-01-05', takeTestLink: '/test5', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/KSOU.png` },
  { name: 'VTU', date: '2025-01-06', takeTestLink: '/test6', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/VTU.png` },
  { name: 'Mangalore University', date: '2025-01-03', takeTestLink: '/test3', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/Mangalore.png` },
  { name: 'Kuvempu University', date: '2025-01-04', takeTestLink: '/test4', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/Kuvempu.png` },
  
  { name: 'Tumkur University', date: '2025-01-07', takeTestLink: '/test7', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/Tumkur.png` },
  { name: 'Davangere University', date: '2025-01-08', takeTestLink: '/test8', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/Davengere.png` },
  { name: 'Chamarajanagara University', date: '2025-01-09', takeTestLink: '/test9', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/CIMS.png` },
  { name: 'Bagalkote University', date: '2025-01-10', takeTestLink: '/test10', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/Bagalkote.png` },
  { name: 'Hassan University', date: '2025-01-12', takeTestLink: '/test12', registerLink: '/register', image: `${process.env.PUBLIC_URL}/Assets/Hassan.png` },
];

const University = () => {
  const navigate = useNavigate();

  const handleRegisterClick = (registerLink) => {
    navigate(registerLink);
  };

  return (
    <div style={styles.universityContainer}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes buttonHover {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
      <h2 style={styles.title}>Universities</h2>
      <div style={styles.universityGrid}>
        {universities.map((university, index) => (
          <div key={index} style={{ ...styles.universityCard, animation: 'fadeIn 0.5s ease-in-out' }}>
            <img src={university.image} alt={university.name} style={styles.universityImage} />
            <h4 style={styles.universityName}>{university.name}</h4>
            <p style={styles.universityDate}>Date: {university.date}</p>
            <button
              onClick={() => handleRegisterClick(university.registerLink)}
              style={styles.registerButton}
              onMouseEnter={(e) => (e.target.style.animation = 'buttonHover 0.4s ease')}
              onMouseLeave={(e) => (e.target.style.animation = 'none')}
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  universityContainer: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    color: 'black',
    marginBottom: '20px',
  },
  universityGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  universityCard: {
    borderRadius: '10px',
    padding: '20px',
    width: '300px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  universityImage: {
    width: '100px',
    height: '120px',
    objectFit: 'cover',
    marginBottom: '-20px',
    borderRadius: '50%',
  },
  universityName: {
    fontSize: '1.2rem',
    marginTop: '10px',
    color: '#333',
  },
  universityDate: {
    marginTop: '5px',
    color: '#666',
  },
  registerButton: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '15px',
    margin: '10px',
    height: '40px',
    width: '100px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
};

export default University;
