import React, { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./styles.css";
import Sidebar from "../sidebar/sidebar";
import DotsIcon from "./images/dots.png";
import PlusIcon from "./images/plus.png";
import Popup from "./popup";
import MyProfile from "./myprofile";
import NavBar from "../navbar/navbar";

export const Center = () => {
  const [token] = useContext(UserContext);
  const [tasks, setTasks] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (item, id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`/api/tasks/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Failed to delete");
    } else {
      getTasks();
    }
  };

  const getTasks = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch("api/tasks", requestOptions);
    const data = await response.json();
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the tasks");
    } else {
      setTasks(data);
      setLoaded(true);
      getList(data);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const [list, setList] = useState([]);

  const getList = (data) => {
    const tasksCopy = [...data];
    const todo = tasksCopy.filter((v) => v.state === "To do");
    const inprogress = tasksCopy.filter((v) => v.state === "In progress");
    const done = tasksCopy.filter((v) => v.state === "Done");
    let newList = [
      { title: "To do", items: todo },
      { title: "In progress", items: inprogress },
      { title: "Done", items: done },
    ];
    setList(newList);
    let percent;
    if (tasksCopy.length === 0) percent = 0;
    else percent = Math.round((done.length / tasksCopy.length) * 100);
    setPercent(percent);
  };

  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const [popWindow, setPop] = useState(false);
  const popGroup = useRef();

  let dragImg;

  useEffect(() => {
    dragImg = new Image(0, 0);
    dragImg.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  });

  const handleDragStart = (e, p) => {
    e.dataTransfer.setDragImage(dragImg, 0, 0);

    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = p;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleUpdate = async (task) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        state: task.state,
        title: task.title,
        description: task.description,
        priority: task.priority,
      }),
    };
    const response = await fetch(`/api/tasks/${task.id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Couldn't update");
    } else {
      getTasks();
    }
  };

  const handleDragEnter = (e, p) => {
    if (e.target !== dragNode.current) {
      const copyList = [...list];
      let heldItem =
        copyList[dragItem.current.grpI].items[dragItem.current.itemI];

      if (p.grpI === 0) heldItem.state = "To do";
      else if (p.grpI === 1) heldItem.state = "In progress";
      else heldItem.state = "Done";

      handleUpdate(heldItem);
      dragItem.current = p;
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragItem.current = null;
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
  };

  const defineColor = (s) => {
    if (s === "Low") return "#6D7C1D";
    else if (s === "Medium") return "#C25600";
    else return "#AF3218";
  };

  const [editItem, setEditItem] = useState(null);
  const [edit, setEdit] = useState(false);

  const openPopUp = (p) => {
    setPop(true);
    popGroup.current = p;
  };

  const closePopUp = () => {
    setPop(false);
    setEdit(false);
    setEditItem(null);
    getTasks();
  };

  const handleEdit = (item) => {
    setEdit(true);
    setEditItem(item);
    setPop(true);
  };

  const moveToNext = (grpI, itemI) => {
    let itemCopy = list[grpI].items[itemI];
    if (itemCopy.state === "To do") itemCopy.state = "In progress";
    else if (itemCopy.state === "In progress") itemCopy.state = "Done";
    else return;
    handleUpdate(itemCopy);
  };

  const moveAllNext = (grpI) => {
    console.log(list[grpI].items);
    while (!list[grpI].items.empty);
  };

  const [myprofile, setMyProfile] = useState(false);

  return (
    <>
      {loaded && tasks ? (
        <>
          {myprofile ? (
            <MyProfile token={token} setMyProfile={setMyProfile} />
          ) : (
            <>
              <NavBar tasks={tasks} />
              <Sidebar percent={percent} />
              <div className="table-backgroud">
                <div className="table-group">
                  {list.map((grp, grpI) => {
                    return (
                      <div
                        key={grp.title}
                        onDragEnter={
                          dragging && !grp.items.length
                            ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                            : null
                        }
                        className="table"
                      >
                        <div className="menu">
                          <div className="menu-text">
                            <header className="title">{grp.title}</header>
                            <p className="description">
                              {grp.items.length}{" "}
                              {grp.items.length === 1 ? "task" : "tasks"}
                            </p>
                          </div>
                          <button
                            className="plus-button"
                            onClick={() => openPopUp(grpI)}
                          ></button>
                          <button
                            className="item-button-block"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{ marginTop: "40px" }}
                          />
                          <div
                            className="dropdown-menu"
                            id="mainoptions"
                            aria-labelledby="dropdownMenuButton"
                          >
                            {grpI !== 2 ? (
                              <>
                                <button
                                  className="item-options"
                                  id="first"
                                  onClick={() => moveAllNext(grpI)}
                                >
                                  Move all to{" "}
                                  {grpI === 0 ? "In progress" : "Done"}
                                  <div className="dropdown-icon" id="change" />
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
                            <button className="item-options">
                              Delete all
                              <div className="dropdown-icon" id="delete" />
                            </button>
                          </div>
                        </div>
                        {grp.items.length === 0 ? (
                          <EmptyDescription grpI={grpI} openPopUp={openPopUp} />
                        ) : (
                          <></>
                        )}
                        {grp.items.map((item, itemI) => {
                          return (
                            <div
                              draggable
                              key={item.id}
                              onDragStart={(e) =>
                                handleDragStart(e, { grpI, itemI })
                              }
                              onDragEnter={
                                dragging
                                  ? (e) => {
                                      handleDragEnter(e, { grpI, itemI });
                                    }
                                  : null
                              }
                              className="table-item"
                            >
                              <div className="priority-block">
                                <div
                                  className="item-priority"
                                  style={{
                                    border:
                                      "1px solid " + defineColor(item.priority),
                                  }}
                                >
                                  <p
                                    className="priority-text"
                                    style={{
                                      color: defineColor(item.priority),
                                    }}
                                  >
                                    {item.priority}
                                  </p>
                                </div>
                                <button
                                  className="item-button-block"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                />
                                <div
                                  className="dropdown-menu"
                                  id="delate"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  {grpI === 2 ? (
                                    <></>
                                  ) : (
                                    <button
                                      className="item-options"
                                      id="first"
                                      onClick={() => moveToNext(grpI, itemI)}
                                    >
                                      {grpI === 0
                                        ? "Move to In Progress"
                                        : "Move to Done"}
                                      <div
                                        className="dropdown-icon"
                                        id="dragging"
                                        style={{
                                          position: "absolute",
                                          marginTop: "2px",
                                          right: "17px",
                                        }}
                                      />
                                    </button>
                                  )}

                                  <div
                                    className="divider"
                                    style={{ borderColor: "#C8D7F5" }}
                                  />
                                  <button
                                    className="item-options"
                                    onClick={() => handleEdit(item)}
                                  >
                                    Change this task
                                    <div
                                      className="dropdown-icon"
                                      id="change"
                                    />
                                  </button>

                                  <div
                                    className="divider"
                                    style={{ borderColor: "#C8D7F5" }}
                                  />
                                  <button
                                    className="item-options"
                                    id={grpI === 2 ? "first" : "second"}
                                    onClick={() => handleDelete(item, item.id)}
                                  >
                                    Delete this task
                                    <div
                                      className="dropdown-icon"
                                      id="delete"
                                    />
                                  </button>
                                </div>
                              </div>
                              <div className="item-text">
                                <div className="item-title">{item.title}</div>
                                <div className="item-description">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                {popWindow ? (
                  <div>
                    <div className="page-blur" />
                    <Popup
                      token={token}
                      closePopUp={closePopUp}
                      grpI={popGroup.current}
                      edit={edit}
                      item={editItem}
                      handleUpdate={handleUpdate}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

const EmptyDescription = ({ grpI, openPopUp }) => {
  return (
    <div
      className="empty-description"
      style={{ flexDirection: grpI === 0 ? "column" : "row" }}
    >
      {grpI === 0 ? (
        <>
          <h4
            className="inprogress-empty"
            style={{ margin: "auto", display: "" }}
          >
            You don't have any tasks here
          </h4>
          <button className="btn-add-to-do" onClick={() => openPopUp(grpI)}>
            <h4 className="add-to-do-desc">Add new To Do task</h4>
            <div className="add-to-do-icon" />
          </button>
        </>
      ) : (
        <>
          <div className="dragging-icon" />
          <h4 className="inprogress-empty">
            {grpI === 1
              ? "If you are working on a task drag and drop it here"
              : "If you have finished the task drag and drop it here"}
          </h4>
        </>
      )}
    </div>
  );
};
