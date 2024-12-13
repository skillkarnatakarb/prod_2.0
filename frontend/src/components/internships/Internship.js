import React from 'react';
import Banner from './InternshipComponent/Banner';
import University from './InternshipComponent/University';
import TechInternshipSection from './InternshipComponent/TechInternshipSection';
import NonTechInternshipSection from './InternshipComponent/NonTechInternshipSection';

const Internship = () => {
  return (
    <div>
      <Banner />
      <University />
      <TechInternshipSection />
      <NonTechInternshipSection />
    </div>
  );
};

export default Internship;
