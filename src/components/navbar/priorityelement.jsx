import React, { useState } from "react";

const PriorityElement = ({ name, setClick, changeClick, clicked, last }) => {
  const handleClick = () => {
    if (name === clicked) {
      changeClick("");
      setClick("");
    } else {
      changeClick(name);
      setClick(name);
    }
  };

  return (
    <>
      <button
        className="item-options type-priority"
        styles={{ width: "200px", height: "40px" }}
        onClick={() => handleClick()}
        id={name}
      >
        {clicked === name ? "None" : name}
      </button>
      {last ? (
        <></>
      ) : (
        <div className="divider" style={{ background: "black" }} />
      )}
    </>
  );
};

export default PriorityElement;
