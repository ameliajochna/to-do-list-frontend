import React, { Component, useState } from "react";

class Create extends Component {
  state = {
    taskName: "",
  };

  setTaskName = (name) => {
    this.setState({ taskName: name });
  };

  handleAdd = (name) => {
    this.props.onAdd(this.state.taskName);
    this.setState({ taskName: "" });
  };

  render() {
    return (
      <div>
        <span className="badge bg-secondary">New task:</span>
        <input
          type="text"
          required
          value={this.state.taskName}
          onChange={(n) => this.setTaskName(n.target.value)}
        />
        <button
          className="btn btn-outline-success btn-sm rounded"
          onClick={() => this.handleAdd(this.state.taskName)}
        >
          +
        </button>
      </div>
    );
  }
}

export default Create;
