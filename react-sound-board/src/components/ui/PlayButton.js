import React, { useState } from "react";

import "./PlayButton.css";

const PlayButton = props => {
  const [togglePlayPause, setTogglePlayPause] = useState(true);

  const audio = new Audio(props.src);
  const playSoundHandler = () => {
    if (audio.paused) {
      audio.play();
      return setTogglePlayPause(false);
    }
    audio.pause();
    audio.currentTime = 0;
    setTogglePlayPause(true);
  };

  return (
    <div
      onClick={playSoundHandler}
      className={togglePlayPause ? "play-button" : "stop-button"}
    >
      <audio src={props.src}></audio>
    </div>
  );
};

export default PlayButton;
