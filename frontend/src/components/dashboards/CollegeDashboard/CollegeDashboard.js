// CollegeDashboard.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './CollegeComponents/Sidebar';
import College_porfile from './CollegeComponents/College_porfile';
import ContactUs from './CollegeComponents/ContactUs';
import Notification from './CollegeComponents/Notification';
import Settings from './CollegeComponents/Settings';
import Student from './CollegeComponents/Student';
import Dashboard from './CollegeComponents/Dashboard';
import Internship from './CollegeComponents/Internship';
import Jobs from './CollegeComponents/Jobs';
import Events from './CollegeComponents/Events';

const CollegeDashboard = () => (
  <div style={{ display: 'flex', minHeight: '100vh' }}>
    <Sidebar />
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/college-dashboard/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="student" element={<Student />} />
          <Route path="internship" element={<Internship />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="events" element={<Events />} />
          
          <Route path="College_profile" element={<College_porfile />} />
          <Route path="ContactUs" element={<ContactUs />} />
          <Route path="Notification" element={<Notification />} />
          <Route path="Settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  </div>
);

export default CollegeDashboard;
