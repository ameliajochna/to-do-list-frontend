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
  setSearchName,
  setFilterPriority,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState(false);

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
    const response = await fetch(
      "https://productivity-pzaiolprqa-uc.a.run.app/api/tasks",
      requestOptions,
    );
    if (!response.ok) {
      setErrorMessage("Something went wrong while adding a task");
    }
  };

  const closing = () => {
    closePopUp();
    setFilterPriority("");
    setSearchName("");
  };

  const checkSubmit = (e) => {
    if (priority === "") setError(true);

    if (description === "" && title === "") setInfo(true);

    if (priority !== "" && (description !== "" || title !== "")) {
      if (edit) {
        item.title = title;
        item.description = description;
        item.priority = priority;
        handleUpdate(item);
      } else {
        handleCreateTask(e);
      }
      closing();
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      checkSubmit(e);
    } else if (e.key === "Escape") {
      closing();
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

  useEffect(() => {
    if (priority !== "") setError("");
    if (title !== "" || description !== "") setInfo("");
  });

  return (
    <>
      {loaded ? (
        <div className="popup-window" onKeyUp={(e) => handleKey(e)}>
          <button
            className="btn-close-document"
            id="btn"
            onClick={() => closing()}
          />
          <br />
          <DropDown
            place="pu"
            changeClick={setPriority}
            defaultPriority={priority}
            error={error}
          />
          <div className="popup-form">
            {error ? (
              <p className="error-input">Please choose priority of the task</p>
            ) : (
              <></>
            )}
            {title !== "" ? (
              <p className="drop-down-description" id="title">
                Title
              </p>
            ) : (
              <></>
            )}
            <div
              className="add-title"
              style={{
                border:
                  title !== ""
                    ? "1px solid #FF4F7B"
                    : info
                    ? "1px solid #AF3218"
                    : "1px solid #1B3D84",
              }}
            >
              <input
                type="text"
                required
                placeholder="Add title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-title"
              />
            </div>
            {description !== "" ? (
              <p className="drop-down-description" id="description">
                Description
              </p>
            ) : (
              <></>
            )}
            <div
              className="add-description"
              style={{
                border:
                  description !== ""
                    ? "1px solid #FF4F7B"
                    : info
                    ? "1px solid #AF3218"
                    : "1px solid #1B3D84",
              }}
            >
              <textarea
                type="text"
                required
                placeholder="Add description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-description"
              />
            </div>
            {info ? (
              <p className="error-input" style={{ marginRight: "110px" }}>
                Please type in title or description of the task
              </p>
            ) : (
              <></>
            )}
            <button
              className="submit-login"
              style={{
                width: "205px",
                height: "35px",
                marginTop: "32px",
                marginBottom: "44px",
              }}
              onClick={(e) => checkSubmit(e)}
            >
              Create a new task
            </button>
          </div>
        </div>
      ) : (
        loadData()
      )}
    </>
  );
};

export default Popup;
