import React from "react";

import "./HelpfulHint.css";
const HelpfulHint = props => {
  return <aside className="helpful-hint">{props.children}</aside>;
};

export default HelpfulHint;
