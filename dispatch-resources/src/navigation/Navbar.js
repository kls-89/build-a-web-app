import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <NavLink className="nav-list-item" to="/">
          Home
        </NavLink>
        <NavLink className="nav-list-item" to="/references">
          References
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
