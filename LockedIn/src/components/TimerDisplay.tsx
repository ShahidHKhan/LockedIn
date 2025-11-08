import React from 'react';

const TimerDisplay: React.FC<{ time: number }> = ({ time }) => {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  return (
    <div style={{ fontSize: '3rem', margin: '1rem 0' }}>
      {minutes}:{seconds}
    </div>
  );
};

export default TimerDisplay;
