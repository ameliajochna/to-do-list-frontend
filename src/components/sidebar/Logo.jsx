import React from "react";
import BlueVector from "./images/bluedot.png";
import PinkVector from "./images/pinkdot.png";

const Logo = () => {
  return (
    <div className="logo">
      <img className="pink-vector" src={PinkVector} alt="" />
      <img className="blue-vector" src={BlueVector} alt="" />
      <p className="brand-name">Productivity</p>
    </div>
  );
};

export default Logo;
