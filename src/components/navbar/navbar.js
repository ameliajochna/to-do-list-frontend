import React, { Component } from "react";
import "./styles.css";
import SearchBar from "./searchbar";
import DropDown from "./dropdown";

const NavBar = () => {
  return (
    <div className="navigation-bar">
      <div className="my-task-text">My Tasks</div>
      <SearchBar />
      <DropDown place={"nb"} />
    </div>
  );
};

export default NavBar;
