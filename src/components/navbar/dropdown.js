import React, { Component } from "react";
import DropDownAtom from "./images/dropdown.png";

class DropDown extends Component {
  render() {
    return (
      <div class="dropdown">
        <button
          className="dropdown-button"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Priority
          <img className="dropdown-atom" src={DropDownAtom} alt="" />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Low
          </a>
          <a className="dropdown-item" href="#">
            Medium
          </a>
          <a className="dropdown-item" href="#">
            High
          </a>
        </div>
      </div>
    );
  }
}

export default DropDown;
