import React from "react";
import { Link } from "react-router-dom";

import "./Guide.css";
const Guide = props => {
  return (
    <div className="guide">
      <Link to={`/${props.title}`}>
        <h3>{props.title}</h3>
      </Link>
      {props.children}
    </div>
  );
};

export default Guide;
