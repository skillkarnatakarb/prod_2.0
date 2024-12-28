import React from 'react';
import Header from '../Header'; // Assuming Header.js is in the same directory
import Banner from './InternshipComponent/Banner';
import University from './InternshipComponent/University';
import TechInternshipSection from './InternshipComponent/TechInternshipSection';
import NonTechInternshipSection from './InternshipComponent/NonTechInternshipSection';

const Internship = () => {
  return (
    <div style={{ backgroundColor: 'rgba(255, 253, 252, 0.73)' }}>
      {/* Add the Header component */}
      <Header />
      
      <div >
        <Banner />
      </div>

      <div>
        <University />
      </div>

      <div>
        <TechInternshipSection />
      </div>

      <div>
        <NonTechInternshipSection />
      </div>
    </div>
  );
};

export default Internship;
