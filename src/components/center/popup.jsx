import React, { useState } from "react";
import DropDown from "../navbar/dropdown";

function Popup({ token, setErrorMessage, getTasks, popChange, grpI }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  const handleCreateTask = async (e) => {
    if (priority === "") {
      setError(true);
      return;
    }

    e.preventDefault();

    let grpName;
    if (grpI === 0) grpName = "To do";
    else if (grpI === 1) grpName = "In progress";
    else grpName = "Done";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        state: grpName,
        title: title,
        description: description,
        priority: priority,
      }),
    };
    const response = await fetch("/api/tasks", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when adding a task");
    } else {
      popChange(false);
      getTasks();
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleCreateTask(e);
    } else if (e.key === "Escape") {
      popChange(false);
    }
  };

  return (
    <div className="popup-window" onKeyUp={(e) => handleKey(e)}>
      <DropDown place="pu" changeClick={setPriority} />
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
      {error ? (
        <>
          <p className="error-input">Please choose the priority of the task</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Popup;
