// src/components/navbar/Navbar.js

import React from "react";
import PropTypes from "prop-types";
import "./Navbar.css";

/**
 * Navbar Component
 *
 * The Navbar serves as the top header of the application.
 * It includes the title and can optionally include other controls.
 */
const Navbar = ({ title, children }) => {
  return (
    <div className="navbar">
      <h1 id="title">{title}</h1>
      <div className="header-controls">{children}</div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node, // To include controls or other components
};

export default Navbar;
