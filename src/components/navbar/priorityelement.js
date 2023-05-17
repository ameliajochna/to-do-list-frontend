import React, { useState } from "react";

const PriorityElement = ({ data, setClick, changeClick }) => {
  const name = data[0];

  const defineColor = () => {
    if (name === "Low") return "#6D7C1D";
    else if (name === "Medium") return "#C25600";
    else return "#AF3218";
  };

  const handleClick = () => {
    console.log(name);
    changeClick(name);
    setClick(name);
  };

  return (
    <>
      <button
        className="type-priority"
        style={{ color: defineColor() }}
        onClick={() => handleClick()}
      >
        <p className="text-drop-menu">{name}</p>
      </button>
      <br />
    </>
  );
};

export default PriorityElement;
