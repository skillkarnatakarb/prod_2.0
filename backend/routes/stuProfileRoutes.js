const express = require("express");
const { protect, roleAccess } = require("../middleware/authMiddleware");
const { getStuProfile, updateStuProfile } = require("../controllers/stuProfileController");

const router = express.Router();

// Route to get the profile
router.get("/profile", protect, getStuProfile);

// Route to update/create the profile
router.put("/profile", protect, roleAccess("student"), updateStuProfile);

module.exports = router;
