import React, { useEffect, useState } from "react";

const MyProfile = ({ setMyProfile }) => {
  const closeProfile = () => {
    setMyProfile(false);
  };

  return (
    <>
      <div className="photo-upload">
        <p>Please upload your photo here</p>
      </div>
      <button onClick={() => closeProfile()}>Close My profile</button>
    </>
  );
};

export default MyProfile;
