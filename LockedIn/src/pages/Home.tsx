// Placeholder for Home page — to be implemented later
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleStudyClick = () => {
        navigate('/timer');
    };

    const handleStudyLogClick = () => {
        navigate('/study-log');
    };

    return (
        <div className="home">
            <h1>Pomodoro Studying App</h1>
            <button onClick={handleStudyClick}>Study</button>
            <button onClick={handleStudyLogClick}>Study Log</button>
        </div>
    );
};

export default Home;