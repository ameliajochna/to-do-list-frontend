import React, { Component } from "react";
import blueVector from "./images/bluedot.png";

class ProgressBar extends Component {
  percentage = () => {
    // const doneTasks = [...this.props.tasks].filter((t) => t.active === false);
    // const ratio = (doneTasks.length / this.props.tasks.length) * 100;
    const ratio = 70;
    return ratio + "%";
  };

  vertposition = () => {
    const height = parseInt(this.percentage(), 10);
    const topvalue = 130 - height;
    return topvalue + "%";
  };

  render() {
    return (
      <div>
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
