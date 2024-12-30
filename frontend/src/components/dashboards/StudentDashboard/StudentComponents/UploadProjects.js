import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { fetchProjects, uploadProject, deleteProject } from "../../../../api/api";

const UploadProjects = () => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
  });
  const [error, setError] = useState(null); // State to handle errors
  const [success, setSuccess] = useState(false); // State to display success messages
  const [popupData, setPopupData] = useState(null); // State for popup data

  // Fetch projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(); // Fetch projects from API
        console.log("Projects fetched:", data);

        // Sort projects by 'createdAt' in descending order (most recent first)
        const sortedProjects = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setProjects(sortedProjects); // Update state with sorted projects
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again.");
      }
    };
    loadProjects();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate inputs
    if (!formData.title || !formData.description || !formData.githubLink) {
      setError("All fields are required.");
      return;
    }

    try {
      const newProject = await uploadProject(formData); // Call API
      console.log("Project uploaded:", newProject);

      // Add the new project at the top
      setProjects([newProject, ...projects]); // Adds recent upload first
      setFormData({ title: "", description: "", githubLink: "" });
      setSuccess(true);
    } catch (error) {
      console.error("Upload Error:", error.response || error.message);
      setError("Failed to upload project. Please try again.");
    }
  };

  // Handle delete project
  const handleDelete = async (projectId) => {
    try {
      console.log("Deleting project with ID:", projectId);
      await deleteProject(projectId); // Call API to delete
      setProjects(projects.filter((project) => project._id !== projectId)); // Remove from state
      setError(null);
    } catch (error) {
      console.error("Error deleting project:", error.response || error.message);
      setError("Failed to delete project. Please try again.");
    }
  };

  // Redirect to GitHub link
  const handleViewProject = (githubLink) => {
    // Open link in new tab if valid
    if (githubLink.startsWith("http://") || githubLink.startsWith("https://")) {
      window.open(githubLink, "_blank");
    } else {
      setError("Invalid GitHub link format.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Upload Your Project
      </Typography>

      {/* Success and Error Messages */}
      {success && <Alert severity="success">Project uploaded successfully!</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Form for project upload */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <Box display="flex" flexDirection="column" gap="16px">
          <TextField
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Project Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            required
          />
          <TextField
            label="GitHub Link"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "10px" }}
          >
            Upload Project
          </Button>
        </Box>
      </form>

      {/* Display uploaded projects */}
      <Typography variant="h6" gutterBottom>
        Uploaded Projects
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={3} key={project._id}>
            <Card
              sx={{
                boxShadow: 4,
                borderRadius: "12px",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                  }}
                >
                  {project.description}
                </Typography>
                <Box display="flex" justifyContent="center" marginTop="10px">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    type="button"
                    onClick={() => handleViewProject(project.githubLink)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    type="button"
                    onClick={() => handleDelete(project._id)}
                    sx={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UploadProjects;
