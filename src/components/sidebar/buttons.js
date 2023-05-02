import React, { Component } from "react";
import PinkVector from "./images/pinkdot.png";
import LogOut from "./images/logout.png";
import ProfilePicture from "./images/profilepicture.png";

class Buttons extends Component {
  render() {
    return (
      <div>
        <button
          className="transparent-button"
          onClick={() => console.log("WYLOGUJ")}
        >
          <img className="log-out-icon" src={LogOut} alt="" />
          <div className="log-out-text">Log Out</div>
        </button>
        <button
          className="transparent-button"
          onClick={() => console.log("MOJ PROFIL")}
        >
          <img className="profile-pink-dot" src={PinkVector} alt="" />
          <img className="my-profile-icon" src={ProfilePicture} alt="" />
          <div className="my-profile-text">My Profile</div>
        </button>
      </div>
    );
  }
}

export default Buttons;
