import React from "react";

const Filters = ({
  filterName,
  filterPriority,
  setFilterName,
  setFilterPriority,
}) => {
  const deleteName = () => {
    setFilterName("");
  };

  const deletePriority = () => {
    setFilterPriority("");
  };

  return (
    <>
      {filterName || filterPriority ? (
        <div className="filter-area">
          <h4 className="filter-title">Your searches and filters:</h4>
          {filterName ? (
            <button className="filter-label" onClick={() => deleteName()}>
              {filterName}
              <button className="btn-close-document" id="filter" />
            </button>
          ) : (
            <></>
          )}
          {filterPriority ? (
            <button className="filter-label" onClick={() => deletePriority()}>
              {filterPriority}
              <button className="btn-close-document" id="filter" />
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Filters;
