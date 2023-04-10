import React, { Component } from "react";

class PriorityElement extends Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    checked: false,
  };

  defineColor = () => {
    if (this.state.name === "Low") return "#6D7C1D";
    else if (this.state.name === "Medium") return "#C25600";
    else return "#AF3218";
  };

  handleCLick = () => {
    const updChecked = !this.state.checked;
    this.setState({ checked: updChecked });
  };

  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            defaultChecked={true}
            style={{ accentColor: this.defineColor() }}
            onClick={() => this.handleCLick()}
          />
          <span className="type-priority" style={{ color: this.defineColor() }}>
            {this.state.name}
          </span>
        </label>
        <br />
      </div>
    );
  }
}

export default PriorityElement;
