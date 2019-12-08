import React from "react";

const NavItem = props => {
  return (
    <li>
      <a href="/">{props.title}</a>
    </li>
  );
};

export default NavItem;
