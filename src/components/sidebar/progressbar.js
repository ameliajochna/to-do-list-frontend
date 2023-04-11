import React, { Component } from "react";
import blueVector from "./images/bluedot.png";

class ProgressBar extends Component {
  percentage = () => {
    // const doneTasks = [...this.props.tasks].filter((t) => t.active === false);
    // const ratio = (doneTasks.length / this.props.tasks.length) * 100;
    const ratio = 20;
    return ratio + "%";
  };

  topposition = () => {
    const height = parseInt(this.percentage(), 10);
    const topvalue = 640 - height * 4;
    return topvalue + "px";
  };

  render() {
    return (
      <div>
        <div className="progress" style={{ height: "25px" }}>
          <div className="progress-bar" style={{ width: this.percentage() }} />
        </div>
        <img
          className="percent-dot"
          src={blueVector}
          alt=""
          style={{ top: this.topposition() }}
        />
        <div className="percent-text" style={{ top: this.topposition() }}>
          {this.percentage()}
        </div>
      </div>
    );
  }
}

export default ProgressBar;
