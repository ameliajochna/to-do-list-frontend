import React, { useState, useEffect } from "react";

const Rules = ({ type, setWindow }) => {
  return (
    <>
      <div className="page-blur" />
      <div className="document-window">
        <button
          className="btn-close-document"
          onClick={() => setWindow(false)}
        />
        <div className="document-title">
          <div className="document-icon" />
          <div className="document-title"></div>
        </div>
      </div>
    </>
  );
};

export default Rules;
