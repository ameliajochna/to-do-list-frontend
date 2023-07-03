import React, { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import "./styles.css";
import Sidebar from "../sidebar/sidebar";
import Popup from "./popup";
import MyProfile from "./myprofile";
import NavBar from "../navbar/navbar";
import Filters from "./filters";

export const Center = () => {
  const [token] = useContext(UserContext);
  const [tasks, setTasks] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const [, setErrorMessage] = useState("");

  const [filterName, setFilterName] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      `https://productivity-pzaiolprqa-uc.a.run.app/api/tasks/${id}`,
      requestOptions,
    );
    if (!response.ok) {
      setErrorMessage("Failed to delete");
    } else {
      getTasks();
    }
  };

  const [datavar, setDataVar] = useState(null);

  const getTasks = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "https://productivity-pzaiolprqa-uc.a.run.app/api/tasks",
      requestOptions,
    );
    const data = await response.json();
    setDataVar(data);
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

  const handleDragStart = (e, p) => {
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
    const response = await fetch(
      `https://productivity-pzaiolprqa-uc.a.run.app/api/tasks/${task.id}`,
      requestOptions,
    );
    if (!response.ok) {
      setErrorMessage("Couldn't update");
    } else {
      getTasks();
    }
  };

  const handleDragEnter = (e, p) => {
    if (
      dragging &&
      dragNode.current &&
      dragItem.current &&
      p.grpI !== dragItem.current.grpI
    ) {
      const copyList = [...list];
      let heldItem =
        copyList[dragItem.current.grpI].items[dragItem.current.itemI];

      console.log("held:", heldItem);
      console.log(datavar);
      if (p.grpI === 0) heldItem.state = "To do";
      else if (p.grpI === 1) heldItem.state = "In progress";
      else heldItem.state = "Done";

      console.log("changed: ", heldItem);

      datavar.map((e) => {
        if (e.id === heldItem.id) return heldItem;
        else return e;
      });

      getList(datavar);
      dragItem.current = p;
    }
  };

  const handleDragEnd = () => {
    let heldItem =
      copyList[dragItem.current.grpI].items[dragItem.current.itemI];
    handleUpdate(heldItem);
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
    datavar.map((e) => {
      if (e.id === itemCopy.id) return itemCopy;
      else return e;
    });
    getList(datavar);
    handleUpdate(itemCopy);
  };

  const moveAllNext = (grpI) => {
    let length = list[grpI].items.length;
    for (let i = length - 1; i >= 0; i--) moveToNext(grpI, i);
  };

  const deleteAll = (grpI) => {
    let lenght = list[grpI].items.length;
    for (let i = lenght - 1; i >= 0; i--) {
      let id = list[grpI].items[i].id;
      handleDelete(id);
    }
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
              <div className="table-backgroud">
                <Filters
                  filterName={filterName}
                  filterPriority={filterPriority}
                  setFilterName={setFilterName}
                  setFilterPriority={setFilterPriority}
                  data={tasks}
                  setList={setList}
                />
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
                        style={{
                          height: filterName || filterPriority ? "95%" : "100%",
                          marginTop:
                            filterName || filterPriority ? "35px" : "0px",
                        }}
                      >
                        <div className="menu">
                          <div className="menu-text">
                            <header className="title">{grp.title}</header>
                            <p className="description">
                              {grp.items.length}{" "}
                              {grp.items.length === 1 ? "task" : "tasks"}
                            </p>
                          </div>
                          <Tooltip
                            placement="top"
                            overlay={<span>Add a task</span>}
                            overlayClassName="custom-tooltip"
                          >
                            <button
                              className="plus-button"
                              onClick={() => openPopUp(grpI)}
                            />
                          </Tooltip>

                          <Tooltip
                            placement="top"
                            overlay={<span>More options</span>}
                            overlayClassName="custom-tooltip"
                          >
                            <button
                              className="item-button-block"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              style={{ marginTop: "40px" }}
                            />
                          </Tooltip>
                          <div
                            className="dropdown-menu"
                            id="mainoptions"
                            aria-labelledby="dropdownMenuButton"
                          >
                            {grpI !== 2 ? (
                              <button
                                className="item-options"
                                id="first"
                                onClick={() => moveAllNext(grpI)}
                              >
                                Move all to{" "}
                                {grpI === 0 ? "In progress" : "Done"}
                                <div
                                  className="dropdown-icon"
                                  id="changemenu"
                                />
                              </button>
                            ) : (
                              <></>
                            )}
                            <button
                              className="item-options"
                              onClick={() => deleteAll(grpI)}
                            >
                              Delete all
                              <div className="dropdown-icon" id="deletemenu" />
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
                            <TaskItem
                              item={item}
                              itemI={itemI}
                              grpI={grpI}
                              handleDragStart={handleDragStart}
                              dragging={dragging}
                              handleDragEnter={handleDragEnter}
                              defineColor={defineColor}
                              moveToNext={moveToNext}
                              handleEdit={handleEdit}
                              handleDelete={handleDelete}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
              <NavBar
                tasks={tasks}
                searchName={filterName}
                setSearch={setFilterName}
                setPriority={setFilterPriority}
                filterPriority={filterPriority}
              />
              <Sidebar percent={percent} />
              {popWindow ? (
                <>
                  <div className="page-blur">
                    <Popup
                      token={token}
                      closePopUp={closePopUp}
                      grpI={popGroup.current}
                      edit={edit}
                      item={editItem}
                      handleUpdate={handleUpdate}
                      setSearchName={setFilterName}
                      setFilterPriority={setFilterPriority}
                    />
                    {console.log(filterName, filterPriority)}
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

const TaskItem = ({
  item,
  itemI,
  grpI,
  handleDragStart,
  dragging,
  handleDragEnter,
  defineColor,
  moveToNext,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
      <div
        draggable
        key={item.id}
        onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
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
              border: "1px solid " + defineColor(item.priority),
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

          <Tooltip
            placement="top"
            overlay={<span>More options</span>}
            overlayClassName="custom-tooltip"
          >
            <button
              className="item-button-block"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
          </Tooltip>
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
                {grpI === 0 ? "Move to In Progress" : "Move to Done"}
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

            <div className="divider" style={{ borderColor: "#C8D7F5" }} />
            <button className="item-options" onClick={() => handleEdit(item)}>
              Change this task
              <div className="dropdown-icon" id="change" />
            </button>

            <div className="divider" style={{ borderColor: "#C8D7F5" }} />
            <button
              className="item-options"
              id={grpI === 2 ? "first" : "second"}
              onClick={() => handleDelete(item.id)}
            >
              Delete this task
              <div className="dropdown-icon" id="delete" />
            </button>
          </div>
        </div>
        <div className="item-text">
          {item.title ? <div className="item-title">{item.title}</div> : <></>}
          {item.description ? (
            <div className="item-description">{item.description}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
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
              ? "If you are working on a task, drag and drop it here"
              : "If you have finished the task, drag and drop it here"}
          </h4>
        </>
      )}
    </div>
  );
};
