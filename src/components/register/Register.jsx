import React, { useContext, useState } from "react";

import { UserContext } from "../../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import Rules from "./Rules";

const Register = ({ setRegister }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const [errorMessage, setErrorMessage] = useState(["", "", "", ""]);
  const [, setToken] = useContext(UserContext);
  const [passwordType, setPasswordType] = useState("password");
  const [privacy, setPrivacy] = useState(false);
  const [termsOfService, setTermsOfService] = useState(false);

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
    let ErrorCopy = ["", "", "", ""];
    let error = false;
    if (!checkbox) {
      error = true;
      ErrorCopy[3] =
        "You must agree to our terms and conditions to create an account. Please check this box.";
    }
    if (password.length < 8) {
      error = true;
      ErrorCopy[2] = "Please enter at least 8 characters.";
    }

    if (!email.includes("@")) {
      error = true;
      ErrorCopy[1] =
        "The email is missing an @. Please complete the email with the missing character.";
    }
    if (email.length === 0) {
      error = true;
      ErrorCopy[1] = "Please enter your email.";
    }

    if (name.length === 0) {
      error = true;
      ErrorCopy[0] = "Please enter your name.";
    }
    setErrorMessage(ErrorCopy);
    if (!error) submitRegistration();
  };

  const changePasswordType = () => {
    if (passwordType === "password") setPasswordType("text");
    else setPasswordType("password");
  };

  return (
    <>
      <div className="register-form">
        <h3 className="title-login" style={{ marginTop: "-2%" }}>
          Complete the form below to get started
        </h3>

        <div className="field" style={{ marginTop: "-2%" }}>
          <label className="login-label">Name *</label>
          <div
            className="login-field"
            style={{
              border:
                errorMessage[0] === ""
                  ? "1px solid #1B3D84"
                  : "1px solid #AF3218",
            }}
          >
            <input
              type="name"
              placeholder="E.g. Emilie"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
            />
          </div>
          {errorMessage[0] !== "" ? (
            <ErrorMessage message={errorMessage[0]} />
          ) : (
            <></>
          )}
        </div>

        <div className="field">
          <label className="login-label">Email address *</label>
          <div
            className="login-field"
            style={{
              border:
                errorMessage[1] === ""
                  ? "1px solid #1B3D84"
                  : "1px solid #AF3218",
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
          {errorMessage[1] !== "" ? (
            <ErrorMessage message={errorMessage[1]} />
          ) : (
            <></>
          )}
        </div>

        <div className="field">
          <label className="login-label">Password *</label>
          <div
            className="login-field"
            style={{
              border:
                errorMessage[2] === ""
                  ? "1px solid #1B3D84"
                  : "1px solid #AF3218",
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
          {errorMessage[2] !== "" ? (
            <ErrorMessage message={errorMessage[2]} />
          ) : (
            <></>
          )}
        </div>
        <div>
          <label
            className="terms"
            style={{
              border: errorMessage[3] === "" ? "none" : "1px solid #AF3218",
            }}
          >
            <input
              type="checkbox"
              className="terms-checkbox"
              onClick={() => setCheckbox(!checkbox)}
            />
            <span className="checkmark" />
            <p className="agreement">
              I agree to{" "}
              <button
                className="no-account-register"
                onClick={() => setTermsOfService(true)}
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                className="no-account-register"
                onClick={() => setPrivacy(true)}
              >
                Privacy Policy.
              </button>
            </p>
          </label>
        </div>
        {errorMessage[3] !== "" ? (
          <ErrorMessage message={errorMessage[3]} />
        ) : (
          <></>
        )}
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
      {termsOfService ? (
        <Rules type={0} setWindow={setTermsOfService} />
      ) : (
        <></>
      )}
      {privacy ? <Rules type={1} setWindow={setPrivacy} /> : <></>}
    </>
  );
};

export default Register;
