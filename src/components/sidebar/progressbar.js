import React, { Component } from "react";
import blueVector from "./images/bluedot.png";

class ProgressBar extends Component {
  percentage = () => {
    const data = this.props.data;
    const sum =
      data[0].items.length + data[1].items.length + data[2].items.length;
    const ratio = (data[2].items.length / sum) * 100;
    return ratio + "%";
  };

  vertposition = () => {
    const height = parseInt(this.percentage(), 10);
    const topvalue = 130 - height;
    return topvalue + "%";
  };

  render() {
    return (
      <div className="progress-block">
        <div className="progress" style={{ height: "25px" }}>
          <div className="progress-bar" style={{ width: this.percentage() }} />
        </div>
        <div>
          <img
            className="percent-dot"
            src={blueVector}
            alt=""
            style={{ marginTop: this.vertposition() }}
          />
          <p className="percent-text" style={{ marginTop: "-35px" }}>
            {this.percentage()}
          </p>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
