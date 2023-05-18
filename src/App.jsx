import React, { useContext, useEffect, useState } from "react";
import Register from "./components/register/Register";
import Login from "./components/register/Login";
import Sidebar from "./components/sidebar/sidebar";
import NavBar from "./components/navbar/navbar";
import Center from "./components/center/center";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [token, setToken] = useContext(UserContext);

  return (
    <React.Fragment>
      {token ? (
        <>
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
