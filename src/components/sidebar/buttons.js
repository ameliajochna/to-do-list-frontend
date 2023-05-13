import React, { Component } from "react";
import PinkVector from "./images/pinkdot.png";
import LogOut from "./images/logout.png";
import ProfilePicture from "./images/profilepicture.png";

const Buttons = () => {
  return (
    <div className="buttons-group">
      <button
        className="transparent-button"
        onClick={() => console.log("WYLOGUJ")}
      >
        <img className="log-out-icon" src={LogOut} alt="" />
        <p className="log-out-text">Log Out</p>
      </button>

      <button
        className="transparent-button"
        onClick={() => console.log("MOJ PROFIL")}
      >
        <img className="profile-pink-dot" src={PinkVector} alt="" />
        <img className="my-profile-icon" src={ProfilePicture} alt="" />
        <p className="my-profile-text">My Profile</p>
      </button>
    </div>
  );
};

export default Buttons;
