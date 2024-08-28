// src/components/footer/Footer.js

import React from "react";
import "./Footer.css";

/**
 * Footer component provides motivational content and credits for the project.
 * It's a simple, responsive footer that stays at the bottom of the page.
 */
const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-content">
        <p>
          "With courage, you can overcome any hardship. This is the path I’ve chosen, and I will not waver!"
        </p>
        <div className="motivation">
          <span>Created by Jojo using </span>
          <a href="http://react.dev" target="_blank" rel="noopener noreferrer">React.js</a>
          <span> and </span>
          <a href="https://mui.com/" target="_blank" rel="noopener noreferrer">Material UI</a>
        </div>
        <div className="footer-message">
          Thank you for using my program. I understand that this part of the coding journey can be challenging, but I hope this app helps you understand a bit more. Keep pushing forward!
        </div>
      </div>
    </footer>
  );
};

export default Footer;
