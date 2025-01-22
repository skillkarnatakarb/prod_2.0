import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct way for named export

import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

import Sidebar from "./StudentComponents/Sidebar";
import Header from "./StudentComponents/Header";
import UpcomingInterviews from "./StudentComponents/UpcomingInterviews";
import UploadProjects from "./StudentComponents/UploadProjects";
import ApplyForInternships from "./StudentComponents/ApplyForInternships";
import GetCounseling from "./StudentComponents/GetCounseling";
import Profile from "./StudentComponents/Profile";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // Debugging log
        if (decoded.email) {
          setEmail(decoded.email);
        } else {
          setEmail("Email not found in token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setEmail("Invalid token");
      }
    } else {
      setEmail("No token found");
    }
  }, []);
  ;
  const componentsMap = {
    "Upcoming Interviews": <UpcomingInterviews />,
    "Take Assessments": <div>Take Assessments Component</div>,
    "Upload Projects": <UploadProjects />,
    "Profile": <Profile />,
    "Get Certified": <div>Get Certified Component</div>,
    "Get Counseling": <GetCounseling />,
    "Apply For Internships": <ApplyForInternships />,
  };

  const renderContent = () =>
    componentsMap[activeMenu] || <h2>Welcome to the Student Dashboard!</h2>;

  const handleClose = () => {
    setOpen(false); // Close the popup dialog
  };

  return (
    <div className="dashboard-container">
      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Welcome!</DialogTitle>
        <DialogContent>
          <p>Your email: {email || "Loading..."}</p>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Dashboard Layout */}
      <Sidebar setActiveMenu={setActiveMenu} />
      <div className="dashboard-main">
        <Header title={activeMenu} />
        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StudentDashboard;
