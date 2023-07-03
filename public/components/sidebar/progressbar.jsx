import React from "react";
import blueVector from "./images/bluedot.png";

const ProgressBar = ({ percent }) => {
  const vertPosition = () => {
    const height = parseInt(percent, 10);
    const topvalue = 120 - height;
    return topvalue + "%";
  };

  return (
    <div className="progress-block">
      <div className="progress" style={{ height: "25px" }}>
        <div className="progress-bar" style={{ width: percent + "%" }} />
      </div>
      <div>
        <img
          className="percent-dot"
          src={blueVector}
          alt=""
          style={{ marginTop: vertPosition() }}
        />
        <p className="percent-text" style={{ marginTop: "-40px" }}>
          {percent + "%"}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
