import React from "react";

import "./PlayButton.css";

class PlayButton extends React.Component {
  state = {
    isPaused: true
  };

  // Stop playing audio if user navigates to a different page.
  componentWillUnmount() {
    this.audio.pause();
  }

  audio = new Audio(this.props.src);

  playSoundHandler = () => {
    if (this.state.isPaused) {
      this.audio.play();
      this.setState({ isPaused: false });
    } else {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.setState({ isPaused: true });
    }
  };

  render() {
    return (
      <div
        onClick={this.playSoundHandler}
        className={this.state.isPaused ? "play-button" : "stop-button"}
      >
        <audio src={this.props.src}></audio>
      </div>
    );
  }
}

// const PlayButton = props => {
//   const [isPaused, setIsPaused] = useState(true);
//   const audio = new Audio(props.src);

//   const playSoundHandler = () => {
//     if (isPaused) {
//       audio.play();
//       setIsPaused(false);
//     } else {
//       audio.pause();
//       audio.currentTime = 0;
//       setIsPaused(true);
//     }
//   };

//   return (
//     <div
//       onClick={playSoundHandler}
//       className={isPaused ? "play-button" : "stop-button"}
//     >
//       <audio src={props.src}></audio>
//     </div>
//   );
// };

export default PlayButton;
