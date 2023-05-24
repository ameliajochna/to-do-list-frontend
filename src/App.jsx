import React, { useContext } from "react";
import Register from "./components/register/register";
import Login from "./components/register/login";
import Center from "./components/center/center";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [token, setToken] = useContext(UserContext);

  return (
    <React.Fragment>
      {token ? (
        <Center />
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
