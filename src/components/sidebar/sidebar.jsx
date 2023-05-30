import React from "react";
import ProgressBar from "./progressbar";
import Buttons from "./buttons";
import Logo from "./Logo";
import "./styles.css";

const Sidebar = ({ percent, setMyProfile }) => {
  return (
    <>
      <div className="logo-corner">
        <Logo />
      </div>
      <div className="side-bar">
        <div>
          <p className="my-progress">My progress</p>
        </div>
        <ProgressBar percent={percent} />
        <Buttons setMyprofile={setMyProfile} />
      </div>
      <div className="red-line" />
    </>
  );
};

export default Sidebar;
