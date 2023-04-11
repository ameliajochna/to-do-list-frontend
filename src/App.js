import React, { Component } from "react";
import Sidebar from "./components/sidebar/sidebar";
import NavBar from "./components/navbar/navbar";
import Center from "./components/center/center";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <NavBar />
        <Center />
      </React.Fragment>
    );
  }
}

export default App;
