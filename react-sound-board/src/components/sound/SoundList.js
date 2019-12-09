import React from "react";

import Sound from "./Sound";

import "./SoundList.css";
const DEMOSOUNDS = [
  {
    id: "s1",
    title: "Laugh",
    soundSharing: "Private",
    src: "http://freesound.org/data/previews/495/495715_4397472-lq.mp3"
  },
  {
    id: "s2",
    title: "Boo",
    soundSharing: "Limited",
    src: "testAudio2.mp3"
  },
  {
    id: "s3",
    title: "Grrr",
    soundSharing: "Public",
    src: "testAudio3.mp3"
  }
];

const SoundList = () => {
  return (
    <ul className="sound-list">
      {DEMOSOUNDS.map(sound => {
        return (
          <Sound
            src={sound.src}
            key={sound.id}
            title={sound.title}
            soundSharing={sound.soundSharing}
          />
        );
      })}
    </ul>
  );
};

export default SoundList;
