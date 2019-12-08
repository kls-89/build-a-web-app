import React from "react";

import PlayButton from "../ui/PlayButton";

import "./Sound.css";

const Sound = props => {
  return (
    <div className="sound">
      <div className="sound-header">
        <h2>{props.title}</h2>
      </div>
      <PlayButton />
      <div className="sound-footer">
        <button>Edit</button>
        <button>Delete</button>
        <button>Add to SoundBoard</button>
      </div>
    </div>
  );
};

export default Sound;
