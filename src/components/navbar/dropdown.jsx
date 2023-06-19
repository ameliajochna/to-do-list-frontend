import React, { useState, useEffect, useRef } from "react";
import DropDownAtom from "./images/dropdown.png";
import DropUpAtom from "./images/dropup.png";
import PriorityElement from "./priorityelement";

const DropDown = ({ place, changeClick, defaultPriority, error }) => {
  const [clicked, setClicked] = useState(defaultPriority);
  const [status, setStatus] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setStatus(!status);
  };

  const handleOptionClick = () => {
    setStatus(false);
  };

  const handleDropdownClose = () => {
    setStatus(false);
  };

  useEffect(() => {
    const dropdownElement = dropdownRef.current;
    dropdownElement.addEventListener("hidden.bs.dropdown", handleDropdownClose);

    return () => {
      dropdownElement.removeEventListener(
        "hidden.bs.dropdown",
        handleDropdownClose,
      );
    };
  }, []);

  useEffect(() => {
    setClicked(defaultPriority);
  }, [defaultPriority]);

  return (
    <>
      {clicked ? (
        <p className="drop-down-description" id={place}>
          Priority
        </p>
      ) : (
        <></>
      )}
      <div
        className="drop-down"
        id={place}
        ref={dropdownRef}
        style={{
          border:
            clicked !== ""
              ? "1px solid #FF4F7B"
              : error !== ""
              ? "(1px solid #AF3218"
              : place === "pu"
              ? "1px solid #1B3D84"
              : "2px solid #C8D7F5",
        }}
      >
        <button
          className="dropdown-button"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={status ? "true" : "false"}
          onClick={toggleDropDown}
        >
          <p
            className="priority-title"
            id={place}
            style={{ fontWeight: clicked ? "700" : "400" }}
          >
            {clicked ? clicked : "Priority"}
          </p>
          <img
            className="dropdown-atom"
            src={status ? DropUpAtom : DropDownAtom}
            alt=""
          />
        </button>
        <div
          className="dropdown-menu"
          id={place}
          aria-labelledby="dropdownMenuButton"
        >
          <PriorityElement
            name="Low"
            setClick={setClicked}
            changeClick={changeClick}
            onClick={handleOptionClick}
            clicked={clicked}
            last={false}
          />
          <PriorityElement
            name="Medium"
            setClick={setClicked}
            changeClick={changeClick}
            onClick={handleOptionClick}
            clicked={clicked}
            last={false}
          />
          <PriorityElement
            name="High"
            setClick={setClicked}
            changeClick={changeClick}
            onClick={handleOptionClick}
            clicked={clicked}
            last={true}
          />
        </div>
      </div>
    </>
  );
};

export default DropDown;
