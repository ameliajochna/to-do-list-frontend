import React, { useRef, useState } from "react";
import "./styles.css";

function Center({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, p) => {
    console.log("drag starting");

    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = p;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, p) => {
    if (e.target !== dragNode.current) {
      console.log("target different");
      console.log(p, dragItem);
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
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (p) => {
    const currentItem = dragItem.current;
    if (currentItem.grpI === p.grpI && currentItem.itemI === p.itemI) {
      return "current table-item";
    }
    return "table-item";
  };

  return (
    <div className="table-group">
      {list.map((grp, grpI) => (
        <div
          key={grp.title}
          className="table"
          onDragEnter={
            dragging && !grp.items.lenght
              ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
              : null
          }
        >
          <p className="table-title">{grp.title}</p>
          {grp.items.map((item, itemI) => (
            <div
              draggable
              onDragStart={(e) => {
                handleDragStart(e, { grpI, itemI });
              }}
              onDragEnter={
                dragging
                  ? (e) => {
                      handleDragEnter(e, { grpI, itemI });
                    }
                  : null
              }
              key={item}
              className={dragging ? getStyles({ grpI, itemI }) : "table-item"}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Center;
