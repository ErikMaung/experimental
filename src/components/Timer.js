import React, { useState, useEffect } from 'react';
import './Timer.css';

function formatDate(datetimeString) {
  const date = new Date(datetimeString);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours % 12 === 0 ? '12' : hours % 12}:${minutes < 10 ? '0' + minutes : minutes}${hours < 12 ? 'am' : 'pm'} on ${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
}

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function Timer() {
  const [timers, setTimers] = useState([
    {
      targetDateTime: '2024-09-18T18:30',
      hoursRemaining: 0,
      moneyPerHour: 30.0,
      moneyEarned: 0,
    },
  ]);

  useEffect(() => {
    const calculateTimes = () => {
      const updatedTimers = timers.map((timer) => {
        const targetTime = new Date(timer.targetDateTime);
        const currentTime = new Date();

        const difference = targetTime - currentTime;
        const hoursRemaining = difference / (1000 * 60 * 60);

        const differenceSince = currentTime - targetTime;
        const hoursAgo = differenceSince / (1000 * 60 * 60);
        const moneyEarned = Math.round(hoursAgo * timer.moneyPerHour * 100) / 100; // Rounded to two decimal places

        return {
          ...timer,
          hoursRemaining: Math.round(hoursRemaining * 10000) / 10000,
          moneyEarned: moneyEarned >= 0 ? moneyEarned : -moneyEarned, // Don't show negative money earned
        };
      });
      setTimers(updatedTimers);
    };

    const timer = setInterval(calculateTimes, 128);
    return () => clearInterval(timer);
  }, [timers]);

  const handleDateTimeChange = (index, event) => {
    const updatedTimers = [...timers];
    updatedTimers[index].targetDateTime = event.target.value;
    setTimers(updatedTimers);
  };

  const handleMoneyPerHourChange = (index, event) => {
    const updatedTimers = [...timers];
    updatedTimers[index].moneyPerHour = parseFloat(event.target.value);
    setTimers(updatedTimers);
  };

  return (
    <div className="timer-group">
      {timers.map((timer, index) => (
        <div key={index} className="timer-container">
          <h2>
            {timer.targetDateTime && timer.hoursRemaining > 0
              ? `How many hours until ${formatDate(timer.targetDateTime)}?`
              : timer.targetDateTime
              ? `How many hours since ${formatDate(timer.targetDateTime)}?`
              : 'How many hours until...'}
          </h2>
          <input
            type="datetime-local"
            value={timer.targetDateTime}
            onChange={(event) => handleDateTimeChange(index, event)}
          />
          <p>
            {timer.hoursRemaining > 0 ? 'Hours remaining:' : 'Hours ago:'}
            <br />
            <span className="time-in-hours">
              {timer.hoursRemaining > 0 ? timer.hoursRemaining : -1 * timer.hoursRemaining}
            </span>
          </p>
          <h2>
            {timer.targetDateTime
              ? `How much have you made since ${formatDate(timer.targetDateTime)}?`
              : 'How much have you made since...'}
          </h2>
          <input
            type="number"
            value={timer.moneyPerHour}
            onChange={(event) => handleMoneyPerHourChange(index, event)}
            step="0.01"
            min="0"
            placeholder="Money per hour"
          />
          <p>
            Money earned: <br />
            <span className="money-earned">${timer.moneyEarned.toFixed(2)}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Timer;
