import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

// Components
import Header from "./components/Header";
import Section1 from "./components/Section1";
import Internship from "./components/internships/Internship";
import RegistrationForm from "./components/internships/InternshipComponent/RegistrationForm";
import TakeTest from "./components/internships/InternshipComponent/TakeTest";

import Section2 from "./components/Section2";
import HorizontalVerticalTabs from "./components/HorizontalVerticalTabs";
import VerificationTabs from "./components/VerificationTabs";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Footer from "./components/Footer";
import ImageCard from "./components/ImageCard";
import VideoComponent from "./components/VideoComponent";

// Authentication and Dashboard Components
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./components/dashboards/StudentDashboard/StudentDashboard";
import CorporateDashboard from "./components/dashboards/CorporateDashboard/CorporateDashboard";
import CollegeDashboard from "./components/dashboards/CollegeDashboard/CollegeDashboard";
import Sidebar from "./components/Sidebar";

import "./styles/corporate.css";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // Ensures navigate is defined

  // Refs for smooth scrolling
  const section2Ref = useRef(null);

  // Smooth scrolling function
  const scrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Checking dashboard routes
  const dashboardRoutes = [
    "/student-dashboard",
    "/corporate-dashboard",
    "/college-dashboard",
  ];
  const isDashboard = dashboardRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const excludeHeaderRoutes = ["/register", "/internships", "/taketest"]; // Add other routes if needed
  const shouldShowHeader = !excludeHeaderRoutes.includes(location.pathname);

  // Check for popup on first load
  useEffect(() => {
    if (localStorage.getItem("popupShown")) {
      setShowPopup(false);
    } else {
      localStorage.setItem("popupShown", "true");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* Curtain Raiser Popup
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: '/beta/Assets/bglaunch.png',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: '#fff',
          }}
        >
          <h1 style={{ marginBottom: '20px', fontSize: '2rem', color: 'yellow' }}>
            LAUNCH OF SKILL KARNATAKA
          </h1>
          <p style={{ textAlign: 'center', color: 'white' }}>An Initiative By "RankBook"</p>
          <p style={{ textAlign: 'center', color: 'yellow' }}>(Your Skilling & Hiring Partner)</p>
          <h1 style={{ marginBottom: '20px', fontSize: '2rem', color: '#FD9E0B', textAlign: 'center' }}>
            LAUNCH OF SKILL KARNATAKA
            <p style={{ textAlign: 'center', color: '#9A6108' }}>
              Inauguration by our <br />
              Honorable Deputy Chief Minister <br />
              Dr. D K ShivKumar
            </p>
          </h1>
          {showButton && (
            <button
              onClick={handleVideoPlay}
              style={{
                padding: '12px 24px',
                fontSize: '1.2rem',
                backgroundColor: '#9A6108', // Button color
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: 'fit-content', // Ensures button width adjusts to content
                margin: '0 auto', // Center alignment (if needed within a container)
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                textAlign: 'center', // Centers text inside the button
                transition: 'all 0.3s ease-in-out', // Smooth hover effect
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#B47E26'; // Slight hover effect
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#9A6108'; // Revert to original
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Grand Launch
            </button>
          )}
          <video
            id="curtainVideo"
            style={{ marginTop: '20px', width: '80%', borderRadius: '10px', display: 'none' }}
            src={${process.env.PUBLIC_URL}/Assets/launch.mp4}
            onEnded={handleVideoEnd}
            controls={false}
            autoPlay={false}
          />
        </div>
      )} */}

      {/* Main Application Content */}

      {!showPopup && (
        <>
          {/* {!isDashboard && <Header />} */}
          {!isDashboard && shouldShowHeader && <Header />}

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Background Image */}
                  {/* <div
                    className="responsive-image-container"
                    style={{
                      width: '94%',
                      height: '300px',
                      backgroundImage: `url(${process.env.PUBLIC_URL}/Assets/visionmision.png)`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      margin: '20px auto',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  ></div> */}

                  <div className="responsive-container">
                    <div className="responsive-box">
                      <img
                        src={`${process.env.PUBLIC_URL}/Assets/vision.png`}
                        alt="Vision 2025"
                        className="responsive-image"
                      />
                    </div>
                    <div className="responsive-box">
                      <img
                        src={`${process.env.PUBLIC_URL}/Assets/mission.png`}
                        alt="Mission 2025"
                        className="responsive-image"
                      />
                    </div>
                  </div>

                  {/* Sections */}
                  <section id="section1">
                    <Section1 scrollToSection2={scrollToSection2} />
                  </section>

                  {/* Internships Section */}
                  <section id="internships">
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "40px 20px",
                        textAlign: "center",
                        borderRadius: "20px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        marginBottom: "20px",
                        marginTop: "20px",
                        width: "95%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "2.5rem",
                          color: "#1976d2",
                          marginBottom: "20px",
                        }}
                      >
                        Mega Internship Assessment
                      </h1>
                      <p
                        style={{
                          fontSize: "1.2rem",
                          color: "#555",
                          marginBottom: "30px",
                        }}
                      >
                        Empowering students across Karnataka with
                        career-transforming internship opportunities. Join the
                        state-wide initiative designed to enhance skills and
                        provide real-world experience.
                      </p>
                      <button
                        onClick={() => navigate("/internships")} // Redirects to /internships
                        style={{
                          padding: "15px 30px",
                          fontSize: "1.2rem",
                          backgroundColor: "#1976d2",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          transition: "all 0.3s ease-in-out",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#145a96")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#1976d2")
                        }
                      >
                        Know More
                      </button>
                    </div>
                  </section>

                  <section id="section2" ref={section2Ref}>
                    <Section2 />
                  </section>

                  <section id="VideoComponent">
                    <VideoComponent />
                  </section>

                  <section id="HorizontalVerticalTabssection">
                    <HorizontalVerticalTabs />
                  </section>

                  <section id="VerificationTabs">
                    <VerificationTabs />
                  </section>

                  {/* <section id="ImageCard">
                    <div
                      style={{
                        width: "100%",
                        padding: "20px",
                        boxSizing: "border-box",
                      }}
                    >
                      <ImageCard />
                    </div>
                  </section>  */}

                  {/* <section id="partners-section">
      <div className="responsive-container">
        <ImageCard />
       
      </div>
    </section> */}

<div className="responsive-container">
                    <div className="responsive-box">
                      <img
                        src={`${process.env.PUBLIC_URL}/Assets/acdemic_partner.png`}
                        alt="Vision 2025"
                        className="responsive-image"
                      />
                    </div>
                    <div className="responsive-box">
                      <img
                        src={`${process.env.PUBLIC_URL}/Assets/corporate_partner.png`}
                        alt="Mission 2025"
                        className="responsive-image"
                      />
                    </div>
                  </div>

                  <section id="section3">
                    <Section3 />
                  </section>

                  <section id="section4">
                    <Section4 />
                  </section>

                  <Footer />
                </>
              }
            />

            {/* Internships Route */}
            <Route path="/internships" element={<Internship />} />

            <Route path="/register" element={<RegistrationForm />} />

            <Route path="/taketest" element={<TakeTest />} />

            {/* Authentication Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

            {/* Protected Routes */}
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <>
                    <Sidebar role="student" />
                    <StudentDashboard />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/corporate-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={["corporate"]}>
                  <>
                    <Sidebar role="corporate" />
                    <CorporateDashboard />
                  </>
                </ProtectedRoute>
              }
            />

            <Route
              path="/college-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={["college"]}>
                  <>
                    <Sidebar role="college" />
                    <CollegeDashboard />
                  </>
                </ProtectedRoute>
              }
            />

            {/* Other routes */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
