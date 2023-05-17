import React, { useEffect, useRef, useState, useContext } from "react";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import "./styles.css";
import DotsIcon from "./images/dots.png";
import PlusIcon from "./images/plus.png";
import Popup from "./popup";

const Center = ({ data }) => {
  const [token] = useContext(UserContext);
  const [tasks, setTasks] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [id, setId] = useState(null);

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
      console.log("data: ", data);
      getList(data);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const [list, setList] = useState([]);

  const getList = (data) => {
    const tasksCopy = [...data];
    console.log("task:", tasksCopy[0]);
    const todo = tasksCopy.filter((v) => v.state === "To do");
    const inprogress = tasksCopy.filter((v) => v.state === "In progress");
    const done = tasksCopy.filter((v) => v.state === "Done");
    let newList = [
      { title: "To do", items: todo },
      { title: "In progress", items: inprogress },
      { title: "Done", items: done },
    ];
    setList(newList);
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
    console.log("drag starting");

    e.dataTransfer.setDragImage(dragImg, 0, 0);

    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = p;
    console.log(dragItem);

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, p) => {
    if (e.target !== dragNode.current) {
      console.log("target different");
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[p.grpI].items.splice(
          p.itemI,
          0,
          newList[dragItem.current.grpI].items.splice(
            dragItem.current.itemI,
            1,
          )[0],
        );
        dragItem.current = p;
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    console.log("Ending drag");
    setDragging(false);
    dragItem.current = null;
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
  };

  const getStyles = (p) => {
    if (
      dragItem.current.grpI === p.grpI &&
      dragItem.current.itemI === p.itemI
    ) {
      return "current table-item";
    }
    return "table-item";
  };

  const generateDescription = (n) => {
    if (n === 1) return "task";
    else return "tasks";
  };

  const defineColor = (s) => {
    if (s === "Low") return "#6D7C1D";
    else if (s === "Medium") return "#C25600";
    else return "#AF3218";
  };

  const defineBorder = (s) => {
    if (s === "Low") return "1px solid #6D7C1D";
    else if (s === "Medium") return "1px solid #C25600";
    else return "1px solid #AF3218";
  };

  const openPopUp = (p) => {
    setPop(true);
    popGroup.current = p;
  };

  const delateTask = (e, grpI, itemI) => {
    let copyList = [...list];
    let taskList = copyList[grpI].items;
    let newList = taskList.filter((v, i) => i !== itemI);
    copyList[grpI].items = newList;
    setList(copyList);
  };

  return (
    <>
      {loaded && tasks ? (
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
                        {generateDescription(grp.items.length)}
                      </p>
                    </div>
                    <div className="buttons">
                      <button
                        className="plus-button"
                        onClick={() => openPopUp(grpI)}
                      >
                        <img className="plus-icon" src={PlusIcon} alt="" />
                      </button>
                      <button
                        className="dots-button"
                        onClick={() => console.log("options")}
                      >
                        <img className="dots-icon" src={DotsIcon} alt="" />
                      </button>
                    </div>
                  </div>
                  {grp.items.map((item, itemI) => {
                    return (
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
                        className={
                          dragging ? getStyles({ grpI, itemI }) : "table-item"
                        }
                      >
                        <div className="priority-block">
                          <div
                            className="item-priority"
                            style={{ border: defineBorder(item.priority) }}
                          >
                            <p
                              className="priority-text"
                              style={{ color: defineColor(item.priority) }}
                            >
                              {item.priority}
                            </p>
                          </div>
                        </div>
                        <button
                          className="item-button-block"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={() => console.log("more: ", grpI, itemI)}
                        >
                          <img className="item-button" src={DotsIcon} alt="" />
                        </button>
                        <div
                          className="dropdown-menu"
                          id="delate"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <button
                            className="delate-mode-button"
                            onClick={(e) => delateTask(e, grpI, itemI)}
                          >
                            Delate
                          </button>
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
                popChange={setPop}
                listChange={setList}
                taskList={list}
                grpI={popGroup.current}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        // (<>
        //   {tasks.map( (task)=>
        //   (
        //     <div key={task.id}>
        //     <p>{task.state}</p>
        //     <p>{task.title}</p>
        //     <p>{task.description}</p>
        //     <p>{task.priority}</p>
        //     </div>
        //   )
        //     )
        //   }
        // </>
        // )
        <p>Loading</p>
      )}
    </>
  );
};

export default Center;
