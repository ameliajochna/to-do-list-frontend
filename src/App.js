import React, { Component } from "react";
import Sidebar from "./components/sidebar/sidebar";
import NavBar from "./components/navbar/navbar";
import Center from "./components/center/center";

var data = [
  {
    title: "To do",
    items: [
      [
        "Medium",
        "Preparation of tasks for school in mathematics",
        "Do one task for each of the pages until the exam on 20th September in order to pass for A",
      ],
      ["Low", "Book a table"],
    ],
  },
  {
    title: "In progress",
    items: [
      ["High", "Prepare a presentation", "Tasks 20 and 21 from the textbook"],
      ["High", "Do maths tasks", "Page 20-30"],
    ],
  },
  { title: "Done", items: [["Low", "Vacuum"]] },
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
