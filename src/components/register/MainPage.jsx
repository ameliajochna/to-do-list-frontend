import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./styles.css";
import Screenshot from "./images/screenshot.png";
import BigEllipse from "./images/bigellipse.png";
import SmallEllipse from "./images/smallellipse.png";
import Logo from "./images/logo.png";

const MainPage = () => {
  const [register, setRegister] = useState(false);
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
        <span>
          <img src={Logo} alt="" className="login-logo" />
          {/* 3 kropki */}
        </span>
        {register ? (
          <Register setRegister={setRegister} />
        ) : (
          <Login setRegister={setRegister} />
        )}
      </div>
    </div>
  );
};

export default MainPage;
