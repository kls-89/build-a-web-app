import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <ul className="navbar">
        <NavLink to="/sounds/MY-ID">MySounds</NavLink>
        <NavLink to="/sounds/new">Record New Sound</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
