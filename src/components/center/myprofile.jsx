import React, { useEffect, useState } from "react";

const MyProfile = ({ token, setMyProfile }) => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const closeProfile = () => {
    setMyProfile(false);
  };

  const getUser = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch("api/users/me", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("error");
    } else {
      setEmail(data.email);
      setUserId(data.id);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const changePassword = async () => {
    console.log(userId, email, password, newPassword, confirmPassword);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        email: email,
        password: password,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    };

    const response = await fetch(`/api/users/${userId}`, requestOptions);
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.log("couldnt update password");
      console.log(data.detail);
    } else {
      console.log("password updated");
    }
  };

  return (
    <div>
      <p>Current email: {email}</p>

      <label className="password-label">Password</label>
      <div className="control">
        <input
          type="password"
          placeholder="Enter Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="myprofile-input"
        />
      </div>

      <label className="password-label">New Password</label>
      <div className="control">
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="myprofile-input"
        />
      </div>

      <label className="newpassword-label">Confirm New Password</label>
      <div className="control">
        <input
          type="password"
          placeholder="Enter New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="myprofile-input"
        />
      </div>

      <button onClick={() => changePassword()}>Change my password</button>
      <br />
      <br />
      <br />
      <button onClick={() => closeProfile()}>Close My profile</button>
    </div>
  );
};

export default MyProfile;
