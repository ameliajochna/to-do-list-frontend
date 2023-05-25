import React, { useDeferredValue, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import SearchAtom from "./images/searching.png";

const SearchBar = ({ tasks }) => {
  const [value, setValue] = useState("");

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const list = [...tasks];
    console.log("list:", list);
    const newList = list.map((val) => {
      return { value: val.title + ", " + val.description };
    });
    console.log(newList);
    setOptions(newList);
  }, []);

  const onSelect = (data) => {
    console.log("onSelect", data);
    // focus();
  };

  return (
    <div className="search-bar-object">
      <AutoComplete
        className="searchbar"
        options={options}
        onSelect={onSelect}
        placeholder="input here"
        filterOption={true}
      />
      <img className="search-atom" src={SearchAtom} alt="" />
    </div>
  );
};

export default SearchBar;
