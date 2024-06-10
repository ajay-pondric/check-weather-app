import React, { useState, useEffect } from 'react';

function Clock() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setCurrentDateTime(new Date());
  };

  return (
    <div className='current-date-time'>
      <strong> Today at :  </strong>
      <span className='date-time'> {currentDateTime.toLocaleString()} </span>
    </div>
  );
}

export default Clock;
