const express = require("express");
const { fetchProjects, uploadProject, deleteProject } = require("../controllers/projectController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, fetchProjects); // Fetch user-specific projects
router.post("/", authenticate, uploadProject); // Upload a new project
router.delete("/:id", authenticate, deleteProject); // Delete a project

module.exports = router;
