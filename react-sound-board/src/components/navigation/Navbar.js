import React from "react";

import NavItem from "./NavItem";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <ul>
        <NavLink to="/sounds/MY-ID">
          <NavItem title="MySounds" />
        </NavLink>
        <NavLink to="/sounds/new">
          <NavItem title="Create New Sound" />
        </NavLink>
        <NavLink to="/signup">
          <NavItem title="Sign Up" />
        </NavLink>
        <NavLink to="/login">
          <NavItem title="Sign In" />
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
