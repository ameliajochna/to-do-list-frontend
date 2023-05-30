import React, { useContext, useState } from "react";

import { UserContext } from "../../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import WhiteLogIn from "./images/whitelogin.png";

const Register = ({ setRegister }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

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
    if (
      password === confirmationPassword &&
      password.length > 7 &&
      email.length > 0
    ) {
      submitRegistration();
    } else {
      setErrorMessage(
        "Ensure that passwords match and are at least 8 digits long",
      );
    }
  };

  return (
    <div className="register-form">
      <form>
        <h3 className="title-login">Complete the form below to get started</h3>

        <div className="field">
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
              type="password"
              placeholder="Enter at least 8 digits"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
        </div>
        <label className="terms">
          <input type="checkbox" className="terms-checkbox" />
          <span class="checkmark" />
          {/* I agree to <button>Terms of Service</button> and <button>Privacy Policy.</button> */}
        </label>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="submit-login" onClick={(e) => handleSubmit(e)}>
          Sign in
          {/* <img src={BlueLogIn} alt=""/> */}
          <img src={WhiteLogIn} alt="" />
        </button>
      </form>
      <p className="no-account-info">
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
