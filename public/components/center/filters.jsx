import React, { useEffect } from "react";

const Filters = ({
  filterName,
  filterPriority,
  setFilterName,
  setFilterPriority,
  data,
  setList,
}) => {
  const applyFilters = (array) => {
    if (filterName) {
      array = array.filter(
        (x) =>
          x.description.toLowerCase().includes(filterName.toLowerCase()) ||
          x.title.toLowerCase().includes(filterName.toLowerCase()),
      );
    }
    if (filterPriority) {
      array = array.filter((x) => x.priority.includes(filterPriority));
    }
    return array;
  };

  useEffect(() => {
    getList();
  }, [filterName, filterPriority]);

  const getList = () => {
    const tasksCopy = [...data];
    let todo = tasksCopy.filter((v) => v.state === "To do");
    let inprogress = tasksCopy.filter((v) => v.state === "In progress");
    let done = tasksCopy.filter((v) => v.state === "Done");
    todo = applyFilters(todo);
    inprogress = applyFilters(inprogress);
    done = applyFilters(done);

    let newList = [
      { title: "To do", items: todo },
      { title: "In progress", items: inprogress },
      { title: "Done", items: done },
    ];
    setList(newList);
  };

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
              <div className="btn-close-document" id="filter" />
            </button>
          ) : (
            <></>
          )}
          {filterPriority ? (
            <button className="filter-label" onClick={() => deletePriority()}>
              {filterPriority}
              <div
                className="btn-close-document"
                id="filter"
                style={{ backgroundColor: "#FCFDFF" }}
              />
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
