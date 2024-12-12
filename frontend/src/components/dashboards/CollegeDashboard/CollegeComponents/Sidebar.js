// Sidebar.js
import React from "react";
import { List, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const styles = {
    sidebar: {
      width: "250px",
      height: "100vh",
      background: "#f8f9fc",
      color: "#333",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "20px",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    },
    brand: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "20px",
    },
    brandName: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#4e73df",
    },
    link: {
      textDecoration: "none",
      color: "#6c757d",
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      marginBottom: "10px",
      width: "100%",
      fontSize: "16px",
      borderRadius: "8px",
      transition: "all 0.3s",
    },
    activeLink: {
      backgroundColor: "#e9f0fb",
      color: "#4e73df",
      fontWeight: "bold",
      borderLeft: "5px solid #4e73df",
      borderRadius: "8px 0 0 8px",
      padding: "10px 20px",
    },
  };

  const menuItems = [
    { name: "Dashboard", path: "/college-dashboard/dashboard" },
    { name: "Student", path: "/college-dashboard/student" },
    { name: "Internship", path: "/college-dashboard/internship" },
    { name: "Jobs", path: "/college-dashboard/jobs" },
    { name: "Events", path: "/college-dashboard/events" },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={styles.brandName}>Skillkarnataka</div>
      </div>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} style={{ padding: 0, width: "100%" }}>
            <NavLink
              to={item.path}
              style={({ isActive }) =>
                isActive
                  ? { ...styles.link, ...styles.activeLink }
                  : styles.link
              }
              end
            >
              {item.name}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
