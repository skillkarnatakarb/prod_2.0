const Project = require("../models/Project");

// Fetch Projects for Logged-in User
exports.fetchProjects = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID from `req.user`
    const projects = await Project.find({ userId }); // Fetch projects associated with the user
    if (!projects.length) {
      return res.status(404).json({ message: "No projects found for this user." });
    }
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Error fetching projects.", error: error.message });
  }
};

// Upload a Project
exports.uploadProject = async (req, res) => {
  const { title, description, githubLink } = req.body;
  const userId = req.user.id;

  if (!title || !description || !githubLink) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!githubLink.startsWith("http://") && !githubLink.startsWith("https://")) {
    return res.status(400).json({ message: "GitHub link must start with http:// or https://." });
  }

  try {
    const newProject = await Project.create({
      title,
      description,
      githubLink,
      userId,
    });
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error uploading project:", error.message);
    res.status(500).json({ message: "Error uploading project.", error: error.message });
  }
};


// Delete a Project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Get the logged-in user's ID

  try {
    const project = await Project.findOneAndDelete({ _id: id, userId }); // Delete only if it belongs to the user
    if (!project) {
      return res.status(404).json({ message: "Project not found or not authorized to delete." });
    }
    res.status(200).json({ message: "Project deleted successfully.", project });
  } catch (error) {
    console.error("Error deleting project:", error.message);
    res.status(500).json({ message: "Error deleting project.", error: error.message });
  }
};

