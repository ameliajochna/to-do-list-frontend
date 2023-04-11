import React, { Component } from "react";
import Table from "./table";
import "./styles.css";

class Center extends Component {
  render() {
    return (
      <div className="main-components">
        <div className="table-component left">
          <Table />
        </div>
        <div className="table-component middle">
          <Table />
        </div>
        <div className="table-component right">
          <Table />
        </div>
      </div>
    );
  }
}

export default Center;
