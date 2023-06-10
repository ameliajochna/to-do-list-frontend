import React, { useState } from "react";
import SearchAtom from "./images/searching.png";

const SearchBar = () => {
  const [searchName, setName] = useState("");
  const [status, setStatus] = useState(false);

  const handleInputFocus = () => {
    setStatus(true);
  };

  const handleInputBlur = () => {
    setStatus(false);
  };

  return (
    <>
      {searchName ? <h4 className="search-bar-title">Search</h4> : <></>}
      <div className="search-bar-object">
        <input
          type="text"
          required
          placeholder="Search"
          value={searchName}
          onChange={(e) => setName(e.target.value)}
          className="search-bar"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{ border: status ? "2px solid #FF4F7B" : "2px solid #C8D7F5" }}
        />
        <div className={`search-atom${status ? " active" : ""}`} />
      </div>
    </>
  );
};

export default SearchBar;