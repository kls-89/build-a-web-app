import React from "react";

import Sound from "./Sound";

import "./SoundList.css";
const DEMOSOUNDS = [
  {
    id: "s1",
    title: "Laugh",
    soundSharing: "Private"
  },
  {
    id: "s2",
    title: "Boo",
    soundSharing: "Limited"
  },
  {
    id: "s3",
    title: "Grrr",
    soundSharing: "Public"
  }
];

const SoundList = () => {
  return (
    <ul className="sound-list">
      {DEMOSOUNDS.map(sound => {
        return <Sound title={sound.title} />;
      })}
    </ul>
  );
};

export default SoundList;
