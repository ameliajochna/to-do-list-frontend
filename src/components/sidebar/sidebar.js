import React, { Component } from "react";
import "./styles.css";
import BlueVector from "./images/bluedot.png";
import PinkVector from "./images/pinkdot.png";
import ProgressBar from "./progressbar";
import LogOut from "./images/logout.png";
import ProfilePicture from "./images/profilepicture.png";

class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="logo-corner">
          <img className="pink-vector" src={PinkVector} alt="" />
          <img className="blue-vector" src={BlueVector} alt="" />
          <div className="brand-name">Productivity</div>
        </div>
        <div className="side-bar">
          <div className="my-progress">My progress</div>
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
        <ProgressBar />
      </div>
    );
  }
}

export default Sidebar;
