import React, { useState, useContext } from "react";
import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../../context/UserContext";
import BlueLogIn from "./images/bluelogin.png";
import WhiteLogIn from "./images/whitelogin.png";

const Login = ({ setRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);
  const [passwordType, setPasswordType] = useState("password");

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
      ),
    };

    const response = await fetch("/api/token", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password === "" || email === "")
      setErrorMessage("You need to fill both email and password");
    else submitLogin();
  };

  const changePasswordType = () => {
    if (passwordType === "password") setPasswordType("text");
    else setPasswordType("password");
  };

  return (
    <div className="login-form">
      <h3 className="title-login">Welcome back and be productive!</h3>
      <div className="field">
        <label className="login-label">Email address *</label>
        <div
          className="login-field"
          style={{
            border:
              errorMessage === "" ? "1px solid #1B3D84" : "1px solid #AF3218",
          }}
        >
          <input
            type="email"
            placeholder="E.g. productivity@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>
      </div>

      <div className="field">
        <label className="login-label">Password *</label>
        <div
          className="login-field"
          style={{
            border:
              errorMessage === "" ? "1px solid #1B3D84" : "1px solid #AF3218",
          }}
        >
          <input
            type={passwordType}
            placeholder="Enter at least 8 digits"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button
            className="show-password"
            onClick={() => changePasswordType()}
          />
        </div>
      </div>

      <ErrorMessage message={errorMessage} />
      <br />
      {console.log("errror:", errorMessage)}
      <button className="submit-login" onClick={(e) => handleSubmit(e)}>
        Log in
        <span className="login-icon"></span>
      </button>
      <p className="no-account-info">
        Don't have an account?
        <button
          className="no-account-register"
          onClick={() => setRegister(true)}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;
