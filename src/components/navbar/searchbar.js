import React, { Component } from "react";
import SearchAtom from "./images/searching.png";

class SearchBar extends Component {
  state = {
    searchingName: "",
  };

  setSearchName = (name) => {
    this.setState({ searchingName: name });
  };

  searchName = () => {};

  render() {
    return (
      <div>
        <input
          type="text"
          required
          placeholder="Search"
          value={this.state.searchingName}
          onChange={(s) => this.setSearchName(s.target.value)}
          className="search-bar"
        />
        <img className="search-atom" src={SearchAtom} alt="" />
      </div>
    );
  }
}

export default SearchBar;
