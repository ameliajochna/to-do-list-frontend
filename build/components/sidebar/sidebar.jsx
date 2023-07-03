import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import ProgressBar from "./progressbar";
import PinkVector from "./images/pinkdot.png";
import ProfilePicture from "./images/profilepicture.png";
import StripesSidebar from "./images/stripessidebar.png";
import "./styles.css";

const Sidebar = ({ percent, setMyProfile }) => {
  const [token, setToken] = useContext(UserContext);
  const [sideBar, setSidebar] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLogOut = () => {
    setToken(null);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleToggleSidebar = () => {
    setSidebar(!sideBar);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setSidebar(windowWidth >= 1250);
  }, [windowWidth]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <>
      {windowWidth <= 1250 && !sideBar && (
        <button className="open-sidebar" onClick={handleToggleSidebar}>
          <img className="open-sidebar-image" src={StripesSidebar} alt="" />
          <div className="navbar-red-line" />
        </button>
      )}

      {(sideBar || windowWidth >= 1250) && (
        <>
          <div className="filler" />
          <div className="logo-corner">
            <div className="sidebar-logo" />
            {windowWidth <= 1250 && (
              <button
                className="btn-close-document"
                id="btn"
                style={{ top: "20px", left: "160px" }}
                onClick={handleToggleSidebar}
              />
            )}
          </div>
          <div className="side-bar">
            <p className="my-progress">My progress</p>
            <ProgressBar percent={percent} />

            <div className="buttons-group">
              <button className="log-out-button" onClick={handleLogOut}>
                <div className="log-out-icon" />
                <p className="log-out-text">Log Out</p>
              </button>

              <button
                className="my-profile-button"
                onClick={() => setMyProfile(true)}
              >
                <img className="profile-pink-dot" src={PinkVector} alt="" />
                <img className="my-profile-icon" src={ProfilePicture} alt="" />
                <p className="my-profile-text">My Profile</p>
              </button>
            </div>
          </div>

          <div className="red-line" />
          <div className="page-blur-sidebar" />
        </>
      )}
    </>
  );
};

export default Sidebar;
