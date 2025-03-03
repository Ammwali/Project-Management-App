import React, { useState } from "react";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekStart = (date) => {
    const day = date.getDay();
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - day);
    return newDate;
  };

  const weekStart = getWeekStart(currentDate);

  const weekDays = [...Array(7)].map((_, idx) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + idx);
    return d;
  });

  const middleOfWeek = new Date(weekStart);
  middleOfWeek.setDate(middleOfWeek.getDate() + 3);
  const monthLabel = middleOfWeek.toLocaleString("default", { month: "long" });
  const yearLabel = middleOfWeek.getFullYear();

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleSelectDay = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h3>{`${monthLabel} ${yearLabel}`}</h3>
        <div className="nav-buttons">
          <button onClick={goToPreviousWeek} className="arrow-button">
            <i class="ri-arrow-left-s-line ri-xl"></i>
          </button>
          <button onClick={goToNextWeek} className="arrow-button">
            <i class="ri-arrow-right-s-line ri-xl"></i>
          </button>
        </div>
      </div>

      <div className="days-row">
        {daysOfWeek.map((dayName) => (
          <div key={dayName} className="day-name">
            {dayName}
          </div>
        ))}
      </div>

      <div className="dates-row">
        {weekDays.map((day) => {
          const isSelected = day.toDateString() === selectedDate.toDateString();
          return (
            <div
              key={day.toDateString()}
              className={`date-cell ${isSelected ? "selected" : ""}`}
              onClick={() => handleSelectDay(day)}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
