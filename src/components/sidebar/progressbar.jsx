import React from "react";
import blueVector from "./images/bluedot.png";

const ProgressBar = ({ percent }) => {
  const vertPosition = () => {
    const height = parseInt(percent, 10);
    const topvalue = 40 - percent;
    return topvalue + "%";
  };

  return (
    <div className="progress-block">
      <div
        className="progress"
        style={{ height: "25px", borderRadius: "40px", minWidth: "400px" }}
      >
        <div className="progress-bar" style={{ width: percent + "%" }} />
      </div>
      <div className="percent-dot-block" style={{ marginTop: vertPosition() }}>
        <img className="percent-dot" src={blueVector} alt="" />
        <p className="percent-text" style={{ marginTop: "-40px" }}>
          {percent + "%"}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
