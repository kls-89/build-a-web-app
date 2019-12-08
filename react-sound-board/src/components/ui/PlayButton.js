import React from "react";

import "./PlayButton.css";

const PlayButton = () => {
  const playSoundHandler = () => {
    alert("Play button clicked");
  };
  return <div onClick={playSoundHandler} className="play-button"></div>;
};

export default PlayButton;
