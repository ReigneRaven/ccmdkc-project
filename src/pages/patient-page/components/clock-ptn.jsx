import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="clock-wrapper-ptn">
      <div className="round-clock-ptn">
        <div className="hand hour-hand-ptn" style={{ transform: `rotate(${(hours % 12) * 30 + minutes * 0.5}deg)` }}></div>
        <div className="hand minute-hand-ptn" style={{ transform: `rotate(${minutes * 6}deg)` }}></div>
        <div className="hand second-hand" style={{ transform: `rotate(${seconds * 6}deg)` }}></div>
        <div className="clock-center-ptn"></div>
      </div>
      <p id="clock-p-ptn">Current Time</p>
      <p id="time-p-ptn">{`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}</p>
    </div>
  );
};

export default Clock;
