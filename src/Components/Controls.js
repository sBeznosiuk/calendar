import React from "react";

const controls = ({
  currentMonth,
  prevMonthHandler,
  currentMonthHandler,
  nextMonthHandler,
}) => {
  return (
    <div className="controls section">
      <div className="buttons-form">
        <button type="button" onClick={currentMonthHandler}>
          Today
        </button>
        <button type="button" onClick={prevMonthHandler}>
          Back
        </button>
        <button type="button" onClick={nextMonthHandler}>
          Next
        </button>
      </div>
      <p className="title">{currentMonth}</p>
    </div>
  );
};

export default controls;
