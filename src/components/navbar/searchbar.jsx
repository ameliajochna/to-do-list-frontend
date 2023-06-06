import React, { useState } from "react";
import SearchAtom from "./images/searching.png";

const SearchBar = () => {
  const [searchName, setName] = useState("");

  return (
    <div className="search-bar-object">
      <input
        type="text"
        required
        placeholder="Search"
        value={searchName}
        onChange={(e) => setName(e.target.value)}
        className="search-bar"
      />
      <div className="search-atom" />
    </div>
  );
};

export default SearchBar;
