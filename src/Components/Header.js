import React from "react";

const header = () => {
  return (
    <div className="header section">
      <p className="title">Calendar View</p>
      <div className="buttons-form header-buttons">
        <button>Month</button>
        <button>Week</button>
        <button>Day</button>
      </div>
    </div>
  );
};
export default header;
