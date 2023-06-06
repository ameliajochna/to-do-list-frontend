import React, { useState } from "react";

const PriorityElement = ({ name, setClick, changeClick, clicked }) => {
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
      <button className="type-priority" onClick={() => handleClick()} id={name}>
        <p className="text-drop-menu">{clicked === name ? "None" : name}</p>
      </button>
      <br />
    </>
  );
};

export default PriorityElement;
