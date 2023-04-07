import React, { Component } from "react";

class ProgressBar extends Component {
  percentage = () => {
    const doneTasks = [...this.props.tasks].filter((t) => t.active === false);
    const ratio = (doneTasks.length / this.props.tasks.length) * 100;
    if (ratio === 100) {
      window.alert("Congratulations! All tasks are done!");
    }
    return ratio + "%";
  };

  render() {
    return (
      <div>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: this.percentage() }}
          />
        </div>
      </div>
    );
  }
}

export default ProgressBar;
