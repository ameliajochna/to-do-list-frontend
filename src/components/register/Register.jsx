import React, { useContext, useState } from "react";

import { UserContext } from "../../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import WhiteLogIn from "./images/whitelogin.png";

const Register = ({ setRegister }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);
  const [passwordType, setPasswordType] = useState("password");

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, hashed_password: password }),
    };

    const response = await fetch("/api/users", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 digits long");
    } else if (name.length === 0 || email.length === 0 || !checkbox) {
      setErrorMessage("Ensure that all forms are filled");
    } else {
      submitRegistration();
    }
  };

  const changePasswordType = () => {
    if (passwordType === "password") setPasswordType("text");
    else setPasswordType("password");
  };

  return (
    <div className="register-form">
      <h3 className="title-login" style={{ marginTop: "-2%" }}>
        Complete the form below to get started
      </h3>

      <div className="field" style={{ marginTop: "-2%" }}>
        <label className="login-label">Name *</label>
        <div className="login-field">
          <input
            type="name"
            placeholder="E.g. Emilie"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />
        </div>
      </div>

      <div className="field">
        <label className="login-label">Email address *</label>
        <div className="login-field">
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
        <div className="login-field">
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
      <div>
        <label className="terms">
          <input
            type="checkbox"
            className="terms-checkbox"
            onClick={() => setCheckbox(!checkbox)}
          />
          <span className="checkmark" />
          <p className="agreement">
            I agree to{" "}
            <button className="no-account-register">Terms of Service</button>{" "}
            and <button className="no-account-register">Privacy Policy.</button>
          </p>
        </label>
      </div>
      <ErrorMessage message={errorMessage} />
      <br />
      <button
        className="submit-login"
        style={{ marginTop: "-5%" }}
        onClick={(e) => handleSubmit(e)}
      >
        Sign in
        <span className="login-icon"></span>
      </button>
      <p className="account-info">
        Do you already have an account?
        <button
          className="no-account-register"
          onClick={() => setRegister(false)}
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default Register;
