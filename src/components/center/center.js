import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

function Center({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();
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
    console.log("dragging");
    console.log(p.grpI, p.itemI);
    console.log(dragItem.current.grpI, dragItem.current.itemI);
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
    if (n == 1) return "task";
    else return "tasks";
  };

  return (
    <div className="table-backgroud">
      <div className="table-group">
        {list.map((grp, grpI) => (
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
              <header className="title">{grp.title}</header>
              <p className="description">
                {grp.items.length} {generateDescription(grp.items.length)}
              </p>
            </div>
            {grp.items.map((item, itemI) => (
              <div
                draggable
                key={item}
                onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
                onDragEnter={
                  dragging
                    ? (e) => {
                        handleDragEnter(e, { grpI, itemI });
                      }
                    : null
                }
                className={dragging ? getStyles({ grpI, itemI }) : "table-item"}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Center;
