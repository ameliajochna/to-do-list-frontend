import React, { useEffect, useState } from "react";
import DropDown from "../navbar/dropdown";

const Popup = ({
  token,
  closePopUp,
  setErrorMessage,
  grpI,
  edit,
  item,
  handleUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const handleCreateTask = async (e) => {
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
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      if (priority === "") {
        setError("You must choose priority of the task");
      } else {
        if (edit) {
          item.title = title;
          item.description = description;
          item.priority = priority;
          handleUpdate(item);
        } else {
          handleCreateTask(e);
        }
        closePopUp();
      }
    } else if (e.key === "Escape") {
      closePopUp();
    }
  };

  const loadData = () => {
    if (edit) {
      setTitle(item.title);
      setDescription(item.description);
      setPriority(item.priority);
    }
    setLoaded(true);
  };

  return (
    <>
      {loaded ? (
        <div className="popup-window" onKeyUp={(e) => handleKey(e)}>
          <DropDown
            place="pu"
            changeClick={setPriority}
            defaultPriority={priority}
          />
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
            <textarea
              type="text"
              required
              placeholder="Add description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-description"
            />
          </div>
          <div className="popup-error-space">
            {error !== "" ? (
              <>
                <p className="error-input">{error}</p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        loadData()
      )}
    </>
  );
};

export default Popup;
