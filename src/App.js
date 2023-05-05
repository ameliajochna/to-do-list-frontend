import React, { Component } from "react";
import Sidebar from "./components/sidebar/sidebar";
import NavBar from "./components/navbar/navbar";
import Center from "./components/center/center";

var data = [
  { title: "group1", items: ["1", "2", "3"] },
  { title: "group2", items: ["4", "5"] },
  { title: "group3", items: [] },
];

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <NavBar />
        <Center data={data} />
      </React.Fragment>
    );
  }
}

export default App;
