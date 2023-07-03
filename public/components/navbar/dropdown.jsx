import React, { useState, useEffect } from "react";
import DropDownAtom from "./images/dropdown.png";
import DropUpAtom from "./images/dropup.png";

const DropDown = ({ place, changeClick, defaultPriority, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState("");

  useEffect(() => {
    setClicked(defaultPriority);
  }, [defaultPriority]);

  const handleClick = (name) => {
    setClicked(name);
    changeClick(name);
    setIsOpen(false);
  };

  return (
    <>
      {clicked ? (
        <p className="drop-down-description" id={place}>
          Priority
        </p>
      ) : (
        <></>
      )}
      <div className="dropdown-bar" id={place}>
        <button
          className={`dropdown-btn ${clicked ? "dropdown-clicked" : ""} ${
            isOpen ? "dropdown-open" : ""
          } ${error ? "dropdown-error" : ""} `}
          id={place}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p
            className={`dropdown-bar-text  ${
              clicked ? "dropdown-bar-text-clicked" : ""
            }`}
          >
            {clicked ? clicked : "Priority"}
          </p>
          <img
            className="dropdown-atom"
            src={isOpen ? DropUpAtom : DropDownAtom}
            alt=""
          />
        </button>
        {isOpen ? (
          <div className="dropdown-list" id={place}>
            <DropdownElement
              name="Low"
              handleClick={handleClick}
              clicked={clicked}
            />
            <DropdownElement
              name="Medium"
              handleClick={handleClick}
              clicked={clicked}
            />
            <DropdownElement
              name="High"
              handleClick={handleClick}
              clicked={clicked}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

const DropdownElement = ({ name, handleClick, clicked }) => {
  return (
    <ul
      className="dropdown-element"
      onClick={() => handleClick(name === clicked ? "" : name)}
    >
      <p className="dropdown-text">{clicked === name ? "None" : name}</p>
    </ul>
  );
};

export default DropDown;
