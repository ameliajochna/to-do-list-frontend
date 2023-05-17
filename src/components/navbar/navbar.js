import React, { useState } from "react";
import "./styles.css";
import SearchBar from "./searchbar";
import DropDown from "./dropdown";

const NavBar = () => {
  const [priority, setPriority] = useState("");
  return (
    <div className="navigation-bar">
      <div className="my-task-text">My Tasks</div>
      <SearchBar />
      <DropDown place={"nb"} changeClick={setPriority} />
    </div>
  );
};

export default NavBar;
