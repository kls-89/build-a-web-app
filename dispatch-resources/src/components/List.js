import React from "react";

import "./List.css";

const List = props => {
  return <ul className="list">{props.children}</ul>;
};

export default List;
