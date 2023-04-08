import React, { Component } from "react";
import "./style.css";
import bluevector from "./images/bluedot.png";
import pinkvector from "./images/pinkdot.png";

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="logo-corner">
          <img className="pink-vector" src={pinkvector} alt="" />
          <img className="blue-vector" src={bluevector} alt="" />
          <div className="brand-name">Some logo</div>
        </div>
        <div className="side-bar">
          <div className="my-progress">My progress</div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
