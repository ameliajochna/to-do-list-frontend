import React, { useState } from "react";

const SearchBar = ({ searchName, setSearch }) => {
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
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{
            border:
              status || searchName ? "2px solid #FF4F7B" : "2px solid #C8D7F5",
          }}
        />
        <div className={`search-atom${status ? " active" : ""}`} />
      </div>
    </>
  );
};

export default SearchBar;
