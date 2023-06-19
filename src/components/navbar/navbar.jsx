import React, { useState } from "react";
import "./styles.css";
import SearchBar from "./searchbar";
import DropDown from "./dropdown";

const NavBar = ({
  tasks,
  searchName,
  setSearch,
  setPriority,
  filterPriority,
}) => {
  return (
    <div className="navigation-bar">
      <div className="my-task-text">My Tasks</div>
      <SearchBar searchName={searchName} setSearch={setSearch} />
      <DropDown
        place={"nb"}
        changeClick={setPriority}
        defaultPriority={filterPriority}
        error={""}
      />
    </div>
  );
};

export default NavBar;
