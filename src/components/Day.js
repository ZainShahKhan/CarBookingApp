// Day.js
import React from 'react';

const Day = ({ day, setSelectedDate }) => {
  return (
    <div
      className="day"
      onClick={() => setSelectedDate(day)}
    >
      {day}
    </div>
  );
};

export default Day;
