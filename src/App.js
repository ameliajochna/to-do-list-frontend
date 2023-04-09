import React, { Component } from "react";
import Sidebar from "./components/sidebar/sidebar";
import NavBar from "./components/navbar/navbar";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <NavBar />
      </React.Fragment>
    );
  }
}

export default App;
