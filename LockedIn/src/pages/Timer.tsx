import React, { useState, useEffect } from 'react';
import TimerDisplay from '../components/TimerDisplay';
import useTimer from '../hooks/useTimer';

const Timer = () => {
    // default to 25 minutes (1500 seconds) study interval
    const { time, isActive, startTimer, stopTimer, resetTimer } = useTimer(1500);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        if (time === 0) {
            if (isBreak) {
                resetTimer();
                setIsBreak(false);
            } else {
                setIsBreak(true);
                resetTimer();
            }
        }
    }, [time, isBreak, resetTimer]);

    return (
        <div className="timer-container">
            <h1>{isBreak ? 'Break Time!' : 'Study Time!'}</h1>
            <TimerDisplay time={time} />
            <div className="timer-controls">
                <button onClick={isActive ? stopTimer : startTimer}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;