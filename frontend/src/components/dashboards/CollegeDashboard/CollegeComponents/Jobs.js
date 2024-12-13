import React, { useState } from "react";

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Google",
      salary: "₹8,00,000-₹9,60,000/year",
      location: "Remote",
      hours: "40 hrs/wk",
      type: "Employee",
      logo: "https://via.placeholder.com/50?text=G",
      description: "This is a detailed description of the Senior Product Designer role at Google. Responsibilities include...",
    },
    {
      id: 2,
      title: "Senior Product Designer",
      company: "Dropbox",
      salary: "₹8,00,000-₹9,60,000/year",
      location: "US & CA only",
      hours: "40 hrs/wk",
      type: "Contractor",
      logo: "https://via.placeholder.com/50?text=D",
      description: "This is a detailed description of the Senior Product Designer role at Dropbox. Responsibilities include...",
    },
    {
      id: 3,
      title: "Senior Product Designer",
      company: "Pinterest",
      salary: "₹7,20,000-₹8,00,000/year",
      location: "US & CA only",
      hours: "30 hrs/wk",
      type: "Contractor",
      logo: "https://via.placeholder.com/50?text=P",
      description: "This is a detailed description of the Senior Product Designer role at Pinterest. Responsibilities include...",
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "Microsoft",
      salary: "₹8,80,000-₹10,40,000/year",
      location: "Remote",
      hours: "40 hrs/wk",
      type: "Employee",
      logo: "https://via.placeholder.com/50?text=M",
      description: "This is a detailed description of the Frontend Developer role at Microsoft. Responsibilities include...",
    },
    {
      id: 5,
      title: "Backend Developer",
      company: "Amazon",
      salary: "₹9,60,000-₹11,20,000/year",
      location: "US only",
      hours: "40 hrs/wk",
      type: "Employee",
      logo: "https://via.placeholder.com/50?text=A",
      description: "This is a detailed description of the Backend Developer role at Amazon. Responsibilities include...",
    },
    {
      id: 6,
      title: "UI/UX Designer",
      company: "Apple",
      salary: "₹7,20,000-₹8,80,000/year",
      location: "CA only",
      hours: "40 hrs/wk",
      type: "Employee",
      logo: "https://via.placeholder.com/50?text=Ap",
      description: "This is a detailed description of the UI/UX Designer role at Apple. Responsibilities include...",
    },
    {
      id: 7,
      title: "Mobile Developer",
      company: "Samsung",
      salary: "₹7,50,000-₹9,00,000/year",
      location: "Remote",
      hours: "40 hrs/wk",
      type: "Employee",
      logo: "https://via.placeholder.com/50?text=S",
      description: "This is a detailed description of the Mobile Developer role at Samsung. Responsibilities include...",
    },
    {
      id: 8,
      title: "DevOps Engineer",
      company: "IBM",
      salary: "₹9,00,000-₹11,00,000/year",
      location: "Remote",
      hours: "40 hrs/wk",
      type: "Employee",
      logo: "https://via.placeholder.com/50?text=I",
      description: "This is a detailed description of the DevOps Engineer role at IBM. Responsibilities include...",
    },
    {
      id: 9,
      title: "Project Manager",
      company: "TCS",
      salary: "₹10,00,000-₹12,00,000/year",
      location: "Remote",
      hours: "40 hrs/wk",
      type: "Employee",
      logo: "https://via.placeholder.com/50?text=T",
      description: "This is a detailed description of the Project Manager role at TCS. Responsibilities include...",
    },
  ]);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ marginBottom: "1rem" }}>Jobs for you</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          maxHeight: "370px",
          overflowY: "auto",
        }}
      >
        {selectedJob ? (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              gridColumn: "span 3",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>{selectedJob.title}</h3>
            <p style={{ margin: "0.5rem 0", fontWeight: "bold" }}>{selectedJob.company}</p>
            <p style={{ margin: "0.5rem 0", color: "#555" }}>{selectedJob.description}</p>
            <button
              onClick={() => setSelectedJob(null)}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Back to Jobs
            </button>
          </div>
        ) : (
          jobs.map((job, index) => (
            <div
              key={job.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
              onClick={() => setSelectedJob(job)}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  style={{ width: "50px", height: "50px", borderRadius: "4px", marginRight: "1rem" }}
                />
                <div>
                  <h3 style={{ margin: 0 }}>{job.company}</h3>
                  <span
                    style={{
                      backgroundColor: job.type === "Employee" ? "#ffecb3" : "#e3f2fd",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.875rem",
                    }}
                  >
                    {job.type}
                  </span>
                </div>
              </div>
              <h4 style={{ margin: "0 0 0.5rem" }}>{job.title}</h4>
              <p style={{ margin: "0.5rem 0", fontWeight: "bold", fontSize: "1rem" }}>{job.salary}</p>
              <p style={{ margin: "0.5rem 0", color: "#777" }}>
                <span style={{ marginRight: "0.5rem" }}>📅 {job.hours}</span>
                <span style={{ marginRight: "0.5rem" }}>📍 {job.location}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
