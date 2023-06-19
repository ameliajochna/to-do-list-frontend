import React, { useState, useEffect } from "react";
import TermsAndConditions from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";

const Rules = ({ type, setWindow }) => {
  return (
    <>
      <div className="page-blur" />
      <div className="document-window">
        <button
          className="btn-close-document"
          id="btn"
          onClick={() => setWindow(false)}
        />
        <div className="document-title">
          <div className="document-icon" />
          <h1 className="document-text-title">
            {type === 0 ? "Terms of Service" : "Privacy Policy"}
          </h1>
        </div>
        <div className="rules-block">
          {type === 0 ? <TermsAndConditions /> : <PrivacyPolicy />}
        </div>
      </div>
    </>
  );
};

export default Rules;
