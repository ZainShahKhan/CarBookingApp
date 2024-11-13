// Calendar.js
import React from 'react';
import Day from './Day';

const Calendar = ({ setSelectedDate }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1); // Represents days 1-30 for simplicity.

  return (
    <div className="calendar">
      {days.map((day) => (
        <Day key={day} day={day} setSelectedDate={setSelectedDate} />
      ))}
    </div>
  );
};

export default Calendar;
