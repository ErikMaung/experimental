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
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

function Timer() {
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [targetDateTime, setTargetDateTime] = useState('');

  useEffect(() => {
    setTargetDateTime('2024-09-18T18:30');
  }, [])

  useEffect(() => {
    const calculateHoursRemaining = () => {
      if (!targetDateTime) return;

      const targetTime = new Date(targetDateTime);
      const currentTime = new Date();

      const difference = targetTime - currentTime;
      const hours = difference / (1000 * 60 * 60);

      setHoursRemaining(Math.round(hours * 10000) / 10000); // Rounded to four decimal places
    };

    const timer = setInterval(calculateHoursRemaining, 128);

    return () => clearInterval(timer);
  }, [targetDateTime]);

  const handleDateTimeChange = (event) => {
    setTargetDateTime(event.target.value);
  };

  return (
    <div className="timer-container">
      <h2>{targetDateTime && hoursRemaining > 0 ? `How many hours until ${formatDate(targetDateTime)}?` : targetDateTime ? `How many hours since ${formatDate(targetDateTime)}?` : 'How many hours until...'}</h2>
      <input type='datetime-local' value={targetDateTime || '2024-09-18T18:30'} onChange={handleDateTimeChange}></input>
      <p>{hoursRemaining > 0 ? 'Hours remaining:' : 'Hours ago:'}<br /><span className='time-in-hours'>{hoursRemaining > 0? hoursRemaining : -1*hoursRemaining}</span></p>
    </div>
  );
}

export default Timer;
