import React, { useState } from "react";
import "./styles.css";
import SearchBar from "./searchbar";
import DropDown from "./dropdown";
import StripesSidebar from "./images/stripessidebar.png";
import "react-responsive";

const NavBar = ({ tasks, setSideBar, sideBar }) => {
  const [priority, setPriority] = useState("");

  return (
    <div className="navigation-bar">
      <button className="open-sidebar" onClick={() => setSideBar(!sideBar)}>
        <img className="open-sidebar-image" src={StripesSidebar} />
      </button>
      <div className="my-task-text">My Tasks</div>
      <SearchBar tasks={tasks} />
      <DropDown place={"nb"} changeClick={setPriority} />
    </div>
  );
};

export default NavBar;
