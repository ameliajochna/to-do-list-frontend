import React, { useState } from "react";
import DropDown from "../navbar/dropdown";

function Popup({ popChange, listChange, taskList, grpI }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    popChange(false);
    const toAdd = ["High", title, description];
    console.log(toAdd);
    let list = taskList[grpI].items;
    console.log(list);
    let newList = [toAdd, ...list];
    const newTaskList = taskList.map((v, i) => {
      if (i === grpI) v.items = newList;
      return v;
    });
    listChange(newTaskList);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      addTask();
    } else if (e.key === "Escape") {
      popChange(false);
    }
  };
  return (
    <div className="popup-window" onKeyUp={(e) => handleKey(e)}>
      <DropDown place="pu" />
      <div className="add-title">
        <input
          type="text"
          required
          placeholder="Add title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-title"
        />
      </div>
      <div className="add-description">
        <input
          type="text"
          required
          placeholder="Add description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-description"
        />
      </div>
    </div>
  );
}

export default Popup;
