import React, { Component } from "react";
import DropDownAtom from "./images/dropdown.png";
import PriorityElement from "./priorityelement";

class DropDown extends Component {
  render() {
    return (
      <div className="drop-down">
        <button
          className="dropdown-button"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="priority-text">Priority</div>
          <img className="dropdown-atom" src={DropDownAtom} alt="" />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <PriorityElement name={"Low"} id={1} />
          <PriorityElement name={"Medium"} id={2} />
          <PriorityElement name={"High"} id={3} />
        </div>
      </div>
    );
  }
}

export default DropDown;
