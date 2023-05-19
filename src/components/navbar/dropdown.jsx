import React, { useState } from "react";
import DropDownAtom from "./images/dropdown.png";
import PriorityElement from "./priorityelement";

const DropDown = ({ place, changeClick, defaultPriority }) => {
  //place - either navbar or popup

  const [clicked, setClicked] = useState(defaultPriority);
  const placeId = place;

  const defineColor = () => {
    if (clicked === "Low") return "#6D7C1D";
    else if (clicked === "Medium") return "#C25600";
    else if (clicked === "High") return "#AF3218";
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
      <div
        className="dropdown-menu"
        id="priority"
        aria-labelledby="dropdownMenuButton"
      >
        <PriorityElement
          data={["Low", 1]}
          setClick={setClicked}
          changeClick={changeClick}
        />
        <PriorityElement
          data={["Medium", 2]}
          setClick={setClicked}
          changeClick={changeClick}
        />
        <PriorityElement
          data={["High", 3]}
          setClick={setClicked}
          changeClick={changeClick}
        />
      </div>
    </div>
  );
};

export default DropDown;
