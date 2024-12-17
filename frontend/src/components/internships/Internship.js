import React from 'react';
import Banner from './InternshipComponent/Banner';
import University from './InternshipComponent/University';
import TechInternshipSection from './InternshipComponent/TechInternshipSection';
import NonTechInternshipSection from './InternshipComponent/NonTechInternshipSection';

const Internship = () => {
  return (
    <div style={{ backgroundColor: ' rgba(255, 253, 252, 0.73)' }}>
    <div>
      <Banner />
      </div >

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
