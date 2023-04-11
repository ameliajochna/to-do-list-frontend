import React, { Component } from "react";
import "./styles.css";
import SearchBar from "./searchbar";
import DropDown from "./dropdown";

class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="navigation-bar">
          <div className="my-task-text">My Tasks</div>
          <SearchBar />
          <DropDown />
        </div>
      </div>
    );
  }
}

export default NavBar;
