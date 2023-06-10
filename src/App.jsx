import React, { useContext, useState } from "react";
import MainPage from "./components/register/MainPage";
import { Center } from "./components/center/center";
import { UserContext } from "./context/UserContext";
import "./App.css";

const App = () => {
  const [token, setToken] = useContext(UserContext);
  const [register, setRegister] = useState(false);

  return <React.Fragment>{token ? <Center /> : <MainPage />}</React.Fragment>;
};

export default App;
