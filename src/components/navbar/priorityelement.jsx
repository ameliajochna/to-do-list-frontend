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
        {clicked === name ? "None" : name}
      </button>
      <br />
    </>
  );
};

export default PriorityElement;
