import React, { useContext, useEffect, useState } from "react";
import Register from "./components/register/Register";
import Login from "./components/register/Login";
import Sidebar from "./components/sidebar/sidebar";
import NavBar from "./components/navbar/navbar";
import Center from "./components/center/center";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <React.Fragment>
      {token ? (
        <>
          <Sidebar />
          <NavBar />
          <Center />
        </>
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}
    </React.Fragment>
  );
};

export default App;
