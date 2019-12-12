import React, { useState } from "react";

const New = () => {
  const [recordingInProgress, setRecordingInProgress] = useState(false);
  const buttonHandler = btn => {
    console.log(`${btn} button clicked`);
  };

  const recordButtonStartHandler = event => {
    setRecordingInProgress(true);
    console.log("recording started");
  };

  const recordButtonEndHandler = event => {
    // setRecordingInProgress(true);
    console.log("recording ended");
  };
  return (
    <>
      <h1>New Sound page</h1>
      <button
        onMouseDown={recordButtonStartHandler}
        onMouseUp={recordButtonEndHandler}
      >
        Record Sound
      </button>
      <button disabled={!recordingInProgress} onClick={buttonHandler("play")}>
        Play Sound
      </button>
      <button onClick={buttonHandler("submit")}>Record Button</button>
      {/* <input type="file" accept="audio/*" capture /> */}
    </>
  );
};

export default New;
