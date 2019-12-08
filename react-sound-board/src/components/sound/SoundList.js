import React from "react";
import Sound from "./Sound";

const DEMOSOUNDS = [
  {
    id: "s1",
    title: "Laugh",
    soundSharing: "Private"
  },
  {
    id: "s2",
    title: "Fart",
    soundSharing: "Limited"
  },
  {
    id: "s3",
    title: "Grrr",
    soundSharing: "Public"
  }
];

const SoundList = () => {
  return DEMOSOUNDS.map(sound => {
    return <Sound title={sound.title} />;
  });
};

export default SoundList;
