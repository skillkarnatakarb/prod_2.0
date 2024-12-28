import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Assessment as AssessmentIcon,
  Upload as UploadIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Support as SupportIcon,
  Work as WorkIcon,
} from "@mui/icons-material";

const Sidebar = ({ setActiveMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:1024px)"); // For screens less than 1024px

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Upcoming Interviews", icon: <EventIcon /> },
    { label: "Take Assessments", icon: <AssessmentIcon /> },
    { label: "Upload Projects", icon: <UploadIcon /> },
    { label: "Profile", icon: <PersonIcon /> },
    { label: "Get Certified", icon: <SchoolIcon /> },
    { label: "Get Counseling", icon: <SupportIcon /> },
    { label: "Apply For Internships", icon: <WorkIcon /> },
  ];

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      {isMobile && (
  <IconButton
    onClick={toggleDrawer}
    sx={{
      display: "block",
      // overflow: "visible",
      position: "fixed", // Ensures it is fixed in the viewport
      top: "64px", // Adjust to align with the top
      left: "150px", // Adjust to align with the left edge
      color: "#ffffff", // Maintain white color
      backgroundColor: "", // Optional for visibility
      zIndex: 1400, // Ensure it's above all other elements
    }}
  >
    <MenuIcon />
  </IconButton>
)}



      {/* Drawer for Mobile Screens */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={toggleDrawer}
          anchor="left"
          sx={{
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
              backgroundColor: "#5559cd",
              color: "#ffffff",
            },
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 2,
              color: "#ffffff",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              padding: "20px",
              color: "#ffffff",
            }}
          >
            Student Dashboard
          </Typography>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  setActiveMenu(item.label);
                  toggleDrawer(); // Close drawer on click
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "#3e4a69",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#4e5d80",
                    fontWeight: "bold",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#ffffff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      {/* Permanent Sidebar for Larger Screens */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
              backgroundColor: "#5559cd",
              color: "#ffffff",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              padding: "20px",
              color: "#ffffff",
            }}
          >
            Student Dashboard
          </Typography>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => setActiveMenu(item.label)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#3e4a69",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#4e5d80",
                    fontWeight: "bold",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#ffffff" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
