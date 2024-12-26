import { alignProperty } from "@mui/material/styles/cssUtils";
import React from "react";

const Header = ({ title }) => {
  return <header className="header" ><center>{title}</center></header>;
};

export default Header;
