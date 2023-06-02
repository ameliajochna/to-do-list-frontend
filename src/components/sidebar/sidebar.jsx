import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useMediaQuery } from "react-responsive";
import ProgressBar from "./progressbar";
import PinkVector from "./images/pinkdot.png";
import ProfilePicture from "./images/profilepicture.png";
import "./styles.css";

const Sidebar = ({ percent, setMyProfile, sideBar }) => {
  const [token, setToken] = useContext(UserContext);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1250px)",
  });

  const handleLogOut = () => {
    setToken(null);
  };

  return (
    <>
      {sideBar || isDesktopOrLaptop ? (
        <>
          <div className="logo-corner">
            <div className="sidebar-logo" />
          </div>
          <div className="side-bar">
            <p className="my-progress">My progress</p>
            <ProgressBar percent={percent} />

            <div className="buttons-group">
              <button className="log-out-button" onClick={() => handleLogOut()}>
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
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Sidebar;
