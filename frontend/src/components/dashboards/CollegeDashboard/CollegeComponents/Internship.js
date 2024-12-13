import React, { useState } from "react";

const Internship = () => {
  const [selectedInternship, setSelectedInternship] = useState(null);

  const generateRandomStipend = () => {
    const min = 10000;
    const max = 20000;
    return `₹${Math.floor(Math.random() * (max - min + 1) + min)} - ₹${Math.floor(Math.random() * (max - min + 1) + min)}`;
  };

  const [internships, setInternships] = useState([
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Google",
      stipend: generateRandomStipend(),
      location: "Remote",
      hours: "40 hrs/wk",
      description: "This is a detailed description of the Senior Product Designer role at Google. Responsibilities include...",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Microsoft",
      stipend: generateRandomStipend(),
      location: "Remote",
      hours: "40 hrs/wk",
      description: "This is a detailed description of the Frontend Developer role at Microsoft. Responsibilities include...",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Amazon",
      stipend: generateRandomStipend(),
      location: "US only",
      hours: "40 hrs/wk",
      description: "This is a detailed description of the Backend Developer role at Amazon. Responsibilities include...",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Apple",
      stipend: generateRandomStipend(),
      location: "CA only",
      hours: "40 hrs/wk",
      description: "This is a detailed description of the UI/UX Designer role at Apple. Responsibilities include...",
    },
    {
      id: 5,
      title: "Mobile Developer",
      company: "Samsung",
      stipend: generateRandomStipend(),
      location: "Remote",
      hours: "40 hrs/wk",
      description: "This is a detailed description of the Mobile Developer role at Samsung. Responsibilities include...",
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "Meta",
      stipend: generateRandomStipend(),
      location: "Remote",
      hours: "40 hrs/wk",
      description: "This is a detailed description of the Data Scientist role at Meta. Responsibilities include...",
    },
    {
      id: 7,
      title: "DevOps Engineer",
      company: "IBM",
      stipend: generateRandomStipend(),
      location: "Remote",
      hours: "40 hrs/wk",
      description: "This is a detailed description of the DevOps Engineer role at IBM. Responsibilities include...",
    },
    {
      id: 8,
      title: "Project Manager",
      company: "TCS",
      stipend: generateRandomStipend(),
      location: "Remote",
      hours: "40 hrs/wk",
      description: "This is a detailed description of the Project Manager role at TCS. Responsibilities include...",
    },
    {
      id: 9,
      title: "Graphic Designer",
      company: "Adobe",
      stipend: generateRandomStipend(),
      location: "Remote",
      hours: "30 hrs/wk",
      description: "This is a detailed description of the Graphic Designer role at Adobe. Responsibilities include...",
    },
  ]);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ marginBottom: "1rem" }}>Internships</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {selectedInternship ? (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              gridColumn: "span 3",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>{selectedInternship.title}</h3>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{selectedInternship.company}</p>
            <p style={{ color: "#777", marginBottom: "0.5rem" }}>{selectedInternship.description}</p>
            <p style={{ fontWeight: "bold", color: "#1976d2" }}>{selectedInternship.stipend}</p>
            <p style={{ color: "#777" }}>Location: {selectedInternship.location}</p>
            <button
              onClick={() => setSelectedInternship(null)}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Back to Internships
            </button>
          </div>
        ) : (
          internships.map((internship) => (
            <div
              key={internship.id}
              onClick={() => setSelectedInternship(internship)}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "1.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              <h3>{internship.title}</h3>
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{internship.company}</p>
              <p style={{ color: "#777", marginBottom: "0.5rem" }}>Stipend: {internship.stipend}</p>
              <p style={{ color: "#777" }}>Location: {internship.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Internship;
