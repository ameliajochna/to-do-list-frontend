import React, { Component } from "react";
import "./styles.css";
import BlueVector from "./images/bluedot.png";
import PinkVector from "./images/pinkdot.png";
import ProgressBar from "./progressbar";
import Buttons from "./buttons";

function Sidebar({ data }) {
  return (
    <div>
      <div className="logo-corner">
        <img className="pink-vector" src={PinkVector} alt="" />
        <img className="blue-vector" src={BlueVector} alt="" />
        <p className="brand-name">Productivity</p>
      </div>
      <div className="side-bar">
        <p className="my-progress">My progress</p>
        <ProgressBar data={data} />
        <Buttons />
      </div>
    </div>
  );
}

export default Sidebar;
