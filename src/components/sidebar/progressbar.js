import React, { Component } from "react";
import blueVector from "./images/bluedot.png";

const ProgressBar = ({ data }) => {
  const list = data;

  const percentage = () => {
    const data = list;
    const sum =
      data[0].items.length + data[1].items.length + data[2].items.length;
    const ratio = (data[2].items.length / sum) * 100;
    return ratio + "%";
  };

  const vertPosition = () => {
    const height = parseInt(percentage(), 10);
    const topvalue = 130 - height;
    return topvalue + "%";
  };

  return (
    <div className="progress-block">
      <div className="progress" style={{ height: "25px" }}>
        <div className="progress-bar" style={{ width: percentage() }} />
      </div>
      <div>
        <img
          className="percent-dot"
          src={blueVector}
          alt=""
          style={{ marginTop: vertPosition() }}
        />
        <p className="percent-text" style={{ marginTop: "-35px" }}>
          {percentage()}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
