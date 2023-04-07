import React, { Component } from "react";
import Task from "./task";

class Tasks extends Component {
  render() {
    return (
      <div>
        {this.props.tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            active={task.active}
            onActive={this.props.onActive}
            onDelete={this.props.onDelete}
          />
        ))}
      </div>
    );
  }
}

export default Tasks;
