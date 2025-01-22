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
} from "@mui/material";
import {
  fetchProjects,
  uploadProject,
  deleteProject,
} from "../../../../api/api";

const UploadProjects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      // Sort projects by most recent
      const sortedProjects = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProjects(sortedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
  
    if (!formData.title || !formData.description || !formData.githubLink) {
      setError("All fields are required.");
      return;
    }
  
    try {
      const savedProject = await uploadProject(formData); // Upload the project
      const updatedProjects = await fetchProjects(); // Fetch updated project list
      setProjects(updatedProjects); // Update the state with fresh data
      setFormData({ title: "", description: "", githubLink: "" });
      setSuccess(true);
    } catch (error) {
      console.error("Upload Error:", error.response || error.message);
      setError("Failed to upload project. Please try again.");
    }
  };
  
  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      const updatedProjects = await fetchProjects(); // Fetch updated projects after deletion
      setProjects(updatedProjects);
      setError(null);
    } catch (error) {
      console.error("Error deleting project:", error.response || error.message);
      setError("Failed to delete project. Please try again.");
    }
  };

  const handleViewProject = (githubLink) => {
    if (!githubLink) {
      setError("This project does not have a link.");
      return;
    }
  
    // Open the link in a new tab
    try {
      window.open(githubLink, "_blank");
    } catch (error) {
      setError("Unable to open the link. Please check the URL.");
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Upload Your Project
      </Typography>

      {success && (
        <Alert severity="success">Project uploaded successfully!</Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}

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
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload Project"}
          </Button>
        </Box>
      </form>

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
            {project.title || "Untitled Project"}
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
            {project.description || "No description available"}
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
