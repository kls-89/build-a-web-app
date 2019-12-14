import React from "react";

import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <p>
        This dispatch reference page was made by:{" "}
        <a
          href="https://www.github.com/kls-89"
          target="_blank"
          rel="noopener noreferrer"
        >
          Keenan Leonard-Solis
        </a>
      </p>
      <time dateTime="20191214">December 14th, 2019</time>
    </footer>
  );
};

export default Footer;
