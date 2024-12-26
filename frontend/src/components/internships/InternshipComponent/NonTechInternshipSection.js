import React from "react";

const techCourses = [
  {
    title: "Digital Marketing ",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THDigital marketing.png",

    curriculumLink: process.env.PUBLIC_URL + "/Assets/sample_compressed.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607775?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },
  {
    title: "Business Analytics",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THBusiness analytics.png",
    curriculumLink: process.env.PUBLIC_URL + "/Assets/sample_compressed.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607781?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },
  {
    title: "Corporate Finance",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THCorporate Finance.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607786?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },
  {
    title: "Marketing Management",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THMarketing Management.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607793?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "Investment Banking ",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THInvestment Banking.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607796?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "Accounting",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THAccounting.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607783?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "HR Management",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THHR Management.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607799?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },

  {
    title: "Project Management",
    imgSrc: process.env.PUBLIC_URL + "/Assets/TH/THPROJECT MANAGEMENT.png",
    curriculumLink: "/Assets/zoho-preparation.pdf",
    enrollLink:
      "https://classplusapp.com/w/dean-global-ai-sxofle/courses/607802?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
  },




];
const NonTechCoursesSection = () => {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        marginTop: "90px",
        boxShadow: "0 4px 6px rgba(34, 29, 29, 0.25)",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        margin: "20px",
      }}
    >
      <h2 style={{ fontSize: "2rem", color: "black", marginBottom: "30px" }}>
        Non Technical Courses
      </h2>

      <div
        style={{
          display: "grid",
          gap: "20px",
          paddingRight: "10px",
          maxHeight: "600px",
          overflowY: "auto",
          gridTemplateColumns: "repeat(4, 1fr)", /* Default for Desktop */
        }}
      >
        {techCourses.map((course, index) => (
          <div
            key={index}
            style={{
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 6px rgba(20, 19, 19, 0.58)",
              textAlign: "left",
            }}
          >
            <img
              src={course.imgSrc}
              alt={course.title}
              style={{
                width: "100%",
                height: "290px",
                borderRadius: "10px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />

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
      <style>
        {`
          @media (max-width: 1024px) {
            div > div {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 768px) {
            div > div {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NonTechCoursesSection;
