import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Logo from "../sidebar/Logo";
import "./styles.css";
import Screenshot from "./images/screenshot.png";
import BigEllipse from "./images/bigellipse.png";
import SmallEllipse from "./images/smallellipse.png";

const MainPage = () => {
  const [register, onRegister] = useState(false);
  return (
    <div className="front-page">
      <div className="demo">
        <h2 className="motto">
          Unlock a world of productivity and organization!
        </h2>
        <img src={Screenshot} alt="" className="demo-screenshot" />
        <img src={BigEllipse} alt="" className="big-ellipse-demo" />
        <img src={SmallEllipse} alt="" className="small-ellipse-demo" />
      </div>
      <div className="front-login">
        <Logo />
        {register ? <Register /> : <Login />}
      </div>
    </div>
  );
};

export default MainPage;
