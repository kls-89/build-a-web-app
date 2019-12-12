import React from "react";
const userSounds = [];
const UserSoundboards = () => {
  return (
    <>{userSounds.length > 0 ? { userSounds } : <h1>No Sounds Added</h1>}</>
  );
};

export default UserSoundboards;
