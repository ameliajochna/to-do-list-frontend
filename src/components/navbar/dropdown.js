import React, { useState } from "react";
import DropDownAtom from "./images/dropdown.png";
import PriorityElement from "./priorityelement";

const DropDown = ({ place }) => {
  //place - either navbar or popup

  const [clicked, setClick] = useState("");
  const placeId = place;

  const defineColor = () => {
    if (clicked === "Low") return "#6D7C1D";
    else if (clicked === "Medium") return "#C25600";
    else if (clicked == "High") return "#AF3218";
    else return "#1b3d84";
  };

  return (
    <div className="drop-down" id={placeId}>
      <button
        className="dropdown-button"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <p className="priority-title" style={{ color: defineColor() }}>
          Priority {clicked}
        </p>
        <img className="dropdown-atom" src={DropDownAtom} alt="" />
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <PriorityElement data={["Low", 1]} changeClick={setClick} />
        <PriorityElement data={["Medium", 2]} changeClick={setClick} />
        <PriorityElement data={["High", 3]} changeClick={setClick} />
      </div>
    </div>
  );
};

export default DropDown;
