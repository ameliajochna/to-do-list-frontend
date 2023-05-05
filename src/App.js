import React, { Component } from "react";
import Sidebar from "./components/sidebar/sidebar";
import NavBar from "./components/navbar/navbar";
import Center from "./components/center/center";

var data = [
  {
    title: "To do",
    items: [
      ["medium", "preparation of tasks for school in mathematics"],
      ["low", "book a table"],
    ],
  },
  {
    title: "In progress",
    items: [
      ["high", "prepare a presentation", "tasks 20 and 21 from the textbook"],
      ["high", "do maths tasks", "page 20-30"],
    ],
  },
  { title: "Done", items: [["low", "vacuum"]] },
];

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar data={data} />
        <NavBar />
        <Center data={data} />
      </React.Fragment>
    );
  }
}

export default App;
