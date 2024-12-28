import React from "react";

const techCourses = [
  {
    title: "UI/UX Design",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THUI & UX.png",

    curriculumLink: process.env.PUBLIC_URL + "/Assets/sample.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607763?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },
  {
    title: "Cloud Computing",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THCloud Computing.png",
    curriculumLink: "/Assets/product-based.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607745?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "MERN Stack ",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THMERN.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607731?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "Cyber Security",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THCyber Security.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607729?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "Blockchain",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THBlock Chain.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607709?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "Devops",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THDevops.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607768?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "Data Science",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THData science.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607741?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "SAP",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THSAP.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607758?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "Software Testing",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THSoftware Testing.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607770?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "AI/ML",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THAI & ML.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607748?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },
  {
    title: "RHCSA",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THRHCSA.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607750?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },
  {
    title: "System Engineer",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THSystem Engineer.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607748?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },
];

const TechCoursesSection = () => {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        marginTop: "70px",
        boxShadow: "0 4px 6px rgba(34, 29, 29, 0.25)",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        margin: "20px",
      }}
    >
      <h2 style={{ fontSize: "2rem", color: "black", marginBottom: "30px" }}>
        Technical Courses
      </h2>

      {/* Scrollable Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 cards per row
          gap: "20px",
          maxHeight: "500px", // Container height
          overflowY: "auto", // Scrollbar for overflow content
          paddingRight: "10px",
        }}
      >
        {techCourses.map((course, index) => (
          <div
            key={index}
            style={{
              borderRadius: "10px",
              padding: "15px",
              width: "300px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 6px rgba(20, 19, 19, 0.58)",
              textAlign: "left",
            }}
          >
            <img
              src={course.imgSrc}
              alt={course.title}
              style={{
                width: "270px",
                height: "290px",
                borderRadius: "10px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            {/* Course Title */}
            <h4
              style={{
                fontSize: "1.5rem",
                color: "#333",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              {course.title}
            </h4>


            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <a
                href={course.curriculumLink}
                download
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "5px",
                }}
              >
                Curriculum
              </a>
              <a
                href={course.enrollLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "5px",
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
